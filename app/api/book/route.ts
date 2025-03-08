import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, theme, additionalDetails } = body;

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ehababdalla03@gmail.com',
      subject: `New Photography Booking Request from ${name}`,
      html: `
        <h2>New Photography Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Shoot Theme:</strong> ${theme}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${additionalDetails || 'None provided'}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: 'Booking request sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error sending booking request:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to send booking request' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 