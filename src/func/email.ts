/* eslint-disable import/prefer-default-export */
import NodeMailer from 'nodemailer'

const transporter = NodeMailer.createTransport({
  sendmail: true,
})

export async function sendEmail(to: string, subject: string, text: string) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: 'gm@drunkcircle.com',
      to,
      subject,
      text,
    }, (error, info) => {
      if (error) {
        reject(error)
        return
      }
      resolve(info)
    })
  })
}
