import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-mail", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "divygupta825@gmail.com",
            subject: "New Contact Message",
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #4f46e5; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">📩 New Contact Message</h2>
      </div>

      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        
        <p style="font-size: 16px;">You received a new message from your website:</p>

        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 15px;">
          
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>💬 Message:</strong></p>
          <p style="background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #eee;">
            ${message}
          </p>

        </div>

      </div>

      <!-- Footer -->
      <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">This email was sent from your website contact form</p>
      </div>

    </div>

  </div>
`,
        });

        res.json(data); // actual response bhejo
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running");
});