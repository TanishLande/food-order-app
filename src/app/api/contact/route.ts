import nodemailer from "nodemailer"

// Define interface for the contact form data
interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: "general" | "order" | "feedback"
  message: string
}

// Map subject values to readable titles
const subjectTitles = {
  general: "General Inquiry",
  order: "Order Support",
  feedback: "Customer Feedback",
}

export const POST = async (req: Request): Promise<Response> => {
  try {
    const formData: ContactFormData = await req.json()

    // Input validation
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("Missing required fields")
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    })

    // Format the subject line
    const subjectTitle = subjectTitles[formData.subject] || "Website Contact"

    // Company Email
    const companyMailOptions: nodemailer.SendMailOptions = {
      to: process.env.COMPANY_EMAIL || "company@example.com",
      subject: `New Contact Form Submission: ${subjectTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Subject:</strong> ${subjectTitle}</p>
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          <h3>Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This message was sent from the FlavorFusion website contact form.
          </p>
        </div>
      `,
    }

    // Auto-reply to customer (optional)
    const customerMailOptions: nodemailer.SendMailOptions = {
      to: formData.email,
      subject: "We received your message - FlavorFusion",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Thank You for Contacting Us</h2>
          <p>Dear ${formData.name},</p>
          <p>We have received your message regarding "${subjectTitle}" and will get back to you as soon as possible.</p>
          <p>For your records, here is a copy of your message:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
          <p>If you have any urgent concerns, please call us at +1 (555) 123-4567.</p>
          <p>Best regards,</p>
          <p>The FlavorFusion Team</p>
        </div>
      `,
    }

    // Send emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions), // Optional: comment this out if you don't want to send auto-replies
    ])

    return new Response(JSON.stringify({ message: "Contact form submitted successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to submit contact form"
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

