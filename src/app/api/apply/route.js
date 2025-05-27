import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const country = formData.get("country") || "Not provided";
    const department = formData.get("department") || "Not provided";

    const file = formData.get("file");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    // Prepare file buffer if attached
    let attachments = [];
    if (file && typeof file.name === "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send email to admin
    await transporter.sendMail({
      from: `"Volunteer Application" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Medical Volunteer Application",
      html: `
        <h3>New Volunteer Application</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Motivation:</strong><br/> ${message}</p>
      `,
      attachments,
    });

    // Confirmation email to the applicant
    await transporter.sendMail({
      from: `"Merita Health Team" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Thank you for applying as a volunteer",
      html: `
        <h3>Hello ${fullName},</h3>
        <p>Thank you for your interest in volunteering as a medical doctor with Merita Health.</p>
        <p>We have received your application and will be in touch shortly.</p>
        <br />
        <p>Warm regards,<br/>Merita Health Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
