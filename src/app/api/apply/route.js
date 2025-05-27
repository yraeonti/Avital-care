import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const motivation = formData.get('motivation');
    const country = formData.get('country');
    const department = formData.get('department');
    const file = formData.get('file');

    // Save uploaded file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, file.name);
    await writeFile(filePath, buffer);

    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    // Email to Admin
    await transporter.sendMail({
      from: `"Volunteer App" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Medical Volunteer Application - ${fullName}`,
      text: `
New application received.

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Country: ${country}
Department: ${department}
Motivation:
${motivation}
      `,
      attachments: [
        {
          filename: file.name,
          path: filePath,
        },
      ],
    });

    // Confirmation email to Applicant
    await transporter.sendMail({
      from: `"Merita Health" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Volunteer Application Was Received",
      text: `Dear ${fullName},

Thank you for applying to volunteer as a Medical Doctor with Merita Health.
We have received your application and will contact you soon.

Best regards,  
Merita Health Team`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

