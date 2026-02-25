import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected request body type
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Company email recipients
const COMPANY_EMAILS = ['a.lopez@goldminecomm.net', 'aaronperezdev@gmail.com'];

// Create branded HTML template for company notification
function createCompanyEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #B3995D 0%, #8B7355 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <img src="https://www.goldminecomm.net/images/logo/logo-circular.jpg" alt="Goldmine Communications" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3);" />
          <h1 style="color: white; margin: 15px 0 5px; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">Goldmine Construction Services</p>
        </div>

        <!-- Content -->
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 120px;">Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #555;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Email:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}" style="color: #B3995D; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Phone:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #555;">
                ${data.phone ? `<a href="tel:${data.phone}" style="color: #B3995D; text-decoration: none;">${data.phone}</a>` : 'Not provided'}
              </td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Company:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #555;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Service:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #555;">${data.service || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Message:</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #B3995D; color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
          </div>

          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <a href="mailto:${data.email}?subject=Re: Your Inquiry to Goldmine Communications"
               style="display: inline-block; background: linear-gradient(135deg, #B3995D 0%, #8B7355 100%); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Reply to ${data.name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
          <p>This email was sent from the contact form on goldminecomm.net</p>
          <p>Goldmine Construction Services | License #1099543</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Create branded HTML template for auto-reply to customer
function createAutoReplyHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #B3995D 0%, #8B7355 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <img src="https://www.goldminecomm.net/images/logo/logo-circular.jpg" alt="Goldmine Communications" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.3); margin-bottom: 15px;" />
          <h1 style="color: white; margin: 0 0 10px; font-size: 28px; font-weight: 700;">Thank You, ${data.name}!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">We've received your message</p>
        </div>

        <!-- Content -->
        <div style="background: white; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
            Thank you for contacting <strong>Goldmine Construction Services</strong>. We appreciate your interest in our services and want you to know that your inquiry is important to us.
          </p>

          <div style="background: linear-gradient(135deg, #fdf8f0 0%, #fff9ed 100%); padding: 25px; border-radius: 10px; border: 1px solid #e8dcc8; margin: 25px 0;">
            <h3 style="color: #8B7355; margin: 0 0 15px; font-size: 18px;">What happens next?</h3>
            <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Our team will review your message within <strong>24 business hours</strong></li>
              <li>A member of our team will reach out to discuss your project needs</li>
              <li>We'll provide you with a detailed estimate for your project</li>
            </ul>
          </div>

          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #333; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</h4>
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 100px;">Service:</td>
                <td style="padding: 8px 0; color: #333;">${data.service || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #333; line-height: 1.5;">${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: 30px 0 20px;">
            <p style="color: #666; margin-bottom: 15px;">Need immediate assistance?</p>
            <a href="tel:+19253055980" style="display: inline-block; background: linear-gradient(135deg, #B3995D 0%, #8B7355 100%); color: white; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 5px;">
              📞 Call (925) 305-5980
            </a>
            <a href="tel:+15106953177" style="display: inline-block; background: #333; color: white; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 5px;">
              📞 Call (510) 695-3177
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

          <div style="text-align: center;">
            <h4 style="color: #333; margin-bottom: 15px;">Our Services</h4>
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; background: #f0f0f0; border-radius: 20px; font-size: 13px; color: #555;">Fiber Optics</div>
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; background: #f0f0f0; border-radius: 20px; font-size: 13px; color: #555;">5G Infrastructure</div>
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; background: #f0f0f0; border-radius: 20px; font-size: 13px; color: #555;">EV Charging</div>
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; background: #f0f0f0; border-radius: 20px; font-size: 13px; color: #555;">Construction</div>
            <div style="display: inline-block; margin: 5px; padding: 8px 15px; background: #f0f0f0; border-radius: 20px; font-size: 13px; color: #555;">Network Services</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 25px; color: #888; font-size: 12px;">
          <p style="margin: 5px 0;"><strong>Goldmine Construction Services</strong></p>
          <p style="margin: 5px 0;">1161 Brick and Tile Circle, Stockton, CA 95206</p>
          <p style="margin: 5px 0;">License #1099543 | Licensed, Bonded & Insured</p>
          <p style="margin: 15px 0 5px;">
            <a href="https://www.goldminecomm.net" style="color: #B3995D; text-decoration: none;">www.goldminecomm.net</a>
          </p>
          <p style="margin: 5px 0; color: #aaa; font-size: 11px;">
            Serving Northern California, the Central Valley & the Bay Area
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: ContactFormData = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email and message are required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: data.name.trim().substring(0, 100),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim().substring(0, 20),
      company: data.company?.trim().substring(0, 100),
      service: data.service?.trim().substring(0, 100),
      message: data.message.trim().substring(0, 5000),
    };

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const fromEmail = process.env.EMAIL_FROM || 'noreply@goldminecomm.net';

    // 1. Send notification email to company
    const companyMailOptions = {
      from: `"Goldmine Communications Website" <${fromEmail}>`,
      to: COMPANY_EMAILS.join(', '),
      replyTo: sanitizedData.email,
      subject: `New Contact Form: ${sanitizedData.service || 'General Inquiry'} - ${sanitizedData.name}`,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Company: ${sanitizedData.company || 'Not provided'}
Service: ${sanitizedData.service || 'Not specified'}

Message:
${sanitizedData.message}

---
This email was sent from the contact form on goldminecomm.net
      `,
      html: createCompanyEmailHtml(sanitizedData),
    };

    // 2. Send auto-reply to customer
    const autoReplyOptions = {
      from: `"Goldmine Construction Services" <${fromEmail}>`,
      to: sanitizedData.email,
      subject: `Thank You for Contacting Goldmine Construction Services`,
      text: `
Dear ${sanitizedData.name},

Thank you for contacting Goldmine Construction Services. We have received your message and appreciate your interest in our services.

What happens next?
- Our team will review your message within 24 business hours
- A member of our team will reach out to discuss your project needs
- We'll provide you with a detailed estimate for your project

Your Message Summary:
Service: ${sanitizedData.service || 'General Inquiry'}
Message: ${sanitizedData.message.substring(0, 200)}${sanitizedData.message.length > 200 ? '...' : ''}

Need immediate assistance? Call us:
Primary: (925) 305-5980
Secondary: (510) 695-3177

---
Goldmine Construction Services
1161 Brick and Tile Circle, Stockton, CA 95206
License #1099543 | Licensed, Bonded & Insured
www.goldminecomm.net

Serving Northern California, the Central Valley & the Bay Area
      `,
      html: createAutoReplyHtml(sanitizedData),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully! Check your email for confirmation.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later or call us directly.',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
