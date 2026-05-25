const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    service:"gmail",
    auth:{
        user : process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendresetpassword = async(toEmail, resetLink) =>{
    await transporter.sendMail({
        from:`"Attendify" <${process.env.EMAIL_USER}>`,
        to:toEmail,
        subject:"Reset Password",
        html:` <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
                <h2>Reset Password</h2>
                <p>Halo, kami menerima permintaan reset password untuk akun kamu.</p>
                <p>Klik tombol di bawah ini untuk melanjutkan. Link berlaku selama <strong>15 menit</strong>.</p>
                <a href="${resetLink}"
                   style="display:inline-block; padding:12px 24px; background:#000;
                          color:#fff; border-radius:6px; text-decoration:none;">
                    Reset Password
                </a>
                <p style="margin-top:16px; color:#888; font-size:12px;">
                    Jika kamu tidak merasa meminta reset password, abaikan email ini.
                </p>
            </div>`
    });
}
module.exports = {sendresetpassword};