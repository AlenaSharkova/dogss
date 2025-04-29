// mail.service.js
import {createTransport} from 'nodemailer';
import {mailHtml} from "~/server/data/mail-html.js";

export async function sendOTPByEmail(email, otp, token) {
    try {
        const transporter = createTransport({
            host: 'smtp.mail.ru',
            port: 587,
            secure: false, // use TLS
            auth: {
                user: 'alena.s_00@mail.ru',
                pass: 'Wf2dNszhuRzA0nVhHLvJ',
            },
        });

        const mailOptions = {
            from: 'Собака-улыбака alena.s_00@mail.ru',
            to: email,
            subject: `Одноразовый пароль: ${otp}`,
            text: `Ваш одноразовый пароль: ${otp}. Срок его действия истекает через 5 минут.`,
            html: mailHtml(otp, token),
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

