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
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments = [];
    if (file && typeof file.name === "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send email to Admin
    await transporter.sendMail({
      from: `"Volunteer Application" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
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

    // Confirmation email to user
    await transporter.sendMail({
      from: `"Merita Health" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Applying as a Volunteer",
      html: `
        <h3>Hello ${fullName},</h3>
        <p>Thank you for applying to volunteer with Merita Health.</p>
        <p>We’ve received your application and will get back to you shortly.</p>
        <p>Warm regards,<br/>Merita Health Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
