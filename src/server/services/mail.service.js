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
            subject: `ОTP: ${otp}`,
            text: `Ваш одноразовый пароль: ${otp}. Срок его действия истекает через 3 минуты после отправления.`,
            html: mailHtml(otp, token),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId, info.rejected); // Выводим Message ID для отслеживания
        if (info.rejected.length > 0) {
            throw createError({
                statusCode: 400,
                message: `Email rejected by server for: ${info.rejected.join(', ')}`,
                statusMessage: `Ошибка отправления сообщения на почту`,
                //statusMessage:  error,
            })
        }
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

