import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, websiteType, features, budget, message } = await req.json();

    const websiteIcons: Record<string, string> = {
      "E-Commerce": "🛒",
      "Portfolio": "📂",
      "Business Website": "🏢",
      "Landing Page": "📜",
      "Blog": "📝",
      "Custom Web App": "⚙️",
    };

    const websiteIcon = websiteIcons[websiteType] || "🌐";

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background: #f8f9fa;">
        <div style="background: #007bff; padding: 20px; text-align: center;">
          <h2 style="color: white;">${websiteIcon} New Website Inquiry</h2>
        </div>

        <div style="padding: 20px;">
          <p style="font-size: 16px; font-weight: bold; color: #333;">📌 Client Details:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; font-weight: bold;">👤 Full Name:</td><td>${name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">📧 Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">📞 Phone:</td><td>${phone}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">💻 Website Type:</td><td>${websiteType}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">🚀 Features Required:</td><td>${features.join(", ")}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">💰 Budget Range:</td><td>${budget}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">💬 Message:</td><td>${message}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #e3e3e3; border-radius: 5px;">
            <p style="font-size: 14px; color: #333;">
              📩 This request was submitted through the AWC website. Please follow up as soon as possible.
            </p>
          </div>
        </div>

        <div style="background: #007bff; color: white; padding: 10px; text-align: center;">
          <p style="font-size: 14px;">AWC - Your Partner in Web Solutions</p>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `🌐 ${websiteIcon} New Website Request from ${name}`,
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Inquiry Sent Successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
