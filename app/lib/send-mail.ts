import nodemailer from 'nodemailer';

export async function sendEmailInternal({ subject, message, to }: { subject: string; message: string; to: string }) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === '465',
        auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
        },
    });

    return await transporter.sendMail({
        from: process.env.SENDER_MAIL_ADDRESS,
        to,
        subject,
        text: message,
        html: `<div>${message}</div>`,
    });
}