import nodemailer from 'nodemailer'


type Params = {
  to: string,
  subject: string,
  text?: string,
  html?: string
}

export default async function mailer(data: Params) {

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const info = await transporter.sendMail({
      from: `"Freddie" <${process.env.EMAIL_SENDER}>`, // sender address
      ...data
    });

    return 'message sent'

  } catch (error) {
    return null
  }



  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //




}


