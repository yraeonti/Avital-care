import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const motivation = formData.get("motivation");
    const department = formData.get("department");
    const country = formData.get("country");
    const file = formData.get("file");

    if (!fullName || !email || !phone || !motivation || !department || !country || !file) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // Send to admin
    await transporter.sendMail({
      from: `"Volunteer App" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Volunteer Application - ${fullName}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Motivation:</strong> ${motivation}</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: fileBuffer,
        },
      ],
    });

    // Confirmation to client
    await transporter.sendMail({
      from: `"Volunteer Program" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: `Thanks for applying, ${fullName}!`,
      html: `
        <p>Dear ${fullName},</p>
        <p>Thank you for applying to volunteer as a medical doctor in ${country}.</p>
        <p>We have received your application for the <strong>${department}</strong> department.</p>
        <p>Our team will get back to you shortly.</p>
        <br />
        <p>Warm regards,<br/>Volunteer Coordination Team</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Submission error:", error);
    return new Response(JSON.stringify({ error: "Email sending failed" }), { status: 500 });
  }
}
