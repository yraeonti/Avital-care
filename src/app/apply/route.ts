import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import formidable from "formidable-serverless";

// Disable Next.js body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();

  try {
    // Parse form data and files
    const { fields, files } = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    const { fullName, email, phone, country, department, motivation } = fields;
    const cvFile = files.cvFile;

    if (!fullName || !email || !cvFile) {
      return NextResponse.json(
        { error: "Full Name, Email and CV are required." },
        { status: 400 }
      );
    }

    // Setup Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    // Prepare email to Admin with applicant details and CV attachment
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Volunteer Application from ${fullName}`,
      text: `
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Country: ${country}
Department: ${department}
Motivation: ${motivation}
      `,
      attachments: [
        {
          filename: (cvFile as any).originalFilename || "CV.pdf",
          path: (cvFile as any).filepath,
        },
      ],
    };

    // Confirmation email to applicant
    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Volunteer Application Received",
      text: `Dear ${fullName},

Thank you for your application to volunteer in ${country} in the department of ${department}.

We have received your information and CV and will get back to you shortly.

Best regards,
Volunteer Program Team`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails. Please try again later." },
      { status: 500 }
    );
  }
}

