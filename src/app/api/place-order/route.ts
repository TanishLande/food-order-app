import nodemailer from "nodemailer"

// Define interfaces for the expected request body
interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  additionalInfo?: string
}

interface OrderRequest {
  customerEmail: string
  items: OrderItem[]
  address: Address
  total: number
  paymentMethod: "credit-card" | "cash"
  deliveryOption: "standard" | "express"
  deliveryTime: string
}

export const POST = async (req: Request): Promise<Response> => {
  try {
    const { customerEmail, items, address, total, paymentMethod, deliveryOption, deliveryTime }: OrderRequest =
      await req.json()

    // Input validation
    if (!customerEmail || !items || !address || !total || !paymentMethod || !deliveryOption || !deliveryTime) {
      throw new Error("Missing required fields")
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    })

    // Customer Email
    const customerMailOptions: nodemailer.SendMailOptions = {
      to: customerEmail,
      subject: "Your Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Thank You for Your Order!</h2>
          <p>Your order has been received and will be delivered in approximately ${deliveryTime}.</p>
          <h3>Order Details:</h3>
          <ul style="list-style: none; padding: 0;">
            ${items
              .map(
                (item: OrderItem) => `
              <li style="margin: 10px 0;">
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
              </li>
            `,
              )
              .join("")}
          </ul>
          <p><strong>Shipping Address:</strong> ${address.street}, ${address.city}, ${address.state} ${address.zipCode}</p>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod === "credit-card" ? "Credit/Debit Card" : "Cash on Delivery"}</p>
          <p><strong>Delivery:</strong> ${deliveryOption === "standard" ? "Standard" : "Express"}</p>
          <p>We hope you enjoy your order!</p>
        </div>
      `,
    }

    // Company Email
    const companyMailOptions: nodemailer.SendMailOptions = {
      to: process.env.COMPANY_EMAIL || "company@example.com",
      subject: "New Order Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New  max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Order Received</h2>
          <h3>Customer Details:</h3>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Shipping Address:</strong> ${address.street}, ${address.city}, ${address.state} ${address.zipCode}</p>
          <p><strong>Additional Info:</strong> ${address.additionalInfo || "None"}</p>
          <h3>Order Details:</h3>
          <ul style="list-style: none; padding: 0;">
            ${items
              .map(
                (item: OrderItem) => `
              <li style="margin: 10px 0;">
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
              </li>
            `,
              )
              .join("")}
          </ul>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod === "credit-card" ? "Credit/Debit Card" : "Cash on Delivery"}</p>
          <p><strong>Delivery:</strong> ${deliveryOption === "standard" ? "Standard" : "Express"} (${deliveryTime})</p>
        </div>
      `,
    }

    // Employee Email
    const employeeMailOptions: nodemailer.SendMailOptions = {
      to: process.env.EMPLOYEE_EMAIL || "employees@example.com",
      subject: "New Delivery Order Assignment",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Delivery Order</h2>
          <h3>Delivery Details:</h3>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>Delivery Address:</strong> ${address.street}, ${address.city}, ${address.state} ${address.zipCode}</p>
          <p><strong>Additional Instructions:</strong> ${address.additionalInfo || "None"}</p>
          <h3>Order Items:</h3>
          <ul style="list-style: none; padding: 0;">
            ${items
              .map(
                (item: OrderItem) => `
              <li style="margin: 10px 0;">
                ${item.name} (x${item.quantity})
              </li>
            `,
              )
              .join("")}
          </ul>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod === "credit-card" ? "Credit/Debit Card" : "Cash on Delivery"}</p>
          <p><strong>Delivery Type:</strong> ${deliveryOption === "standard" ? "Standard" : "Express"}</p>
          <p><strong>Expected Delivery Time:</strong> ${deliveryTime}</p>
          <p>Please prepare and deliver the order according to the specified requirements.</p>
        </div>
      `,
    }

    // Send all emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(employeeMailOptions),
    ])

    return new Response(JSON.stringify({ message: "Order emails sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send order emails"
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

