export const mailHtml = (otp, token) => `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; margin: 30px 0; border-radius: 8px; box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.1);">
          <tr>
            <td style="padding: 40px;">
              <!-- Логотип (если есть) -->
              <img src="https://svgsilh.com/svg_v2/306277.svg" alt="Логотип компании" width="150" style="display: block; margin: 0 auto 20px;">

              <h1 style="color: #333333; margin-top: 0; margin-bottom: 20px; font-size: 24px; text-align: center;">Одноразовый пароль</h1>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; text-align: center;">Используйте этот код для подтверждения:</p>

              <div style="background-color: #F2C94C; padding: 20px; border-radius: 6px; text-align: center; margin: 25px 0; box-shadow: 0px 4px 6px 0px rgba(51, 51, 51, 0.25);">
                <strong style="font-size: 32px; color: #ffffff;">${otp}</strong>
              </div>

              <p style="color: #333333; font-size: 14px; text-align: center;">Действителен в течение 3 минут.</p>
              <p style="color: #333333; font-size: 14px; text-align: center;">Если вы не запрашивали этот пароль, проигнорируйте это письмо.</p>
            </td>
          </tr>

           <tr>
            <td style="padding: 20px 40px; background-color: #ffffff; text-align: center;">
              <a href="http://192.168.0.196:3000/auth/token?code=${token}" style="background-color: #47456D; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 15px;">Или подтвердите, перейдя по ссылке сейчас</a>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="color: #333333; font-size: 12px; margin: 0;">© 2025 Ваша компания. Все права защищены.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`