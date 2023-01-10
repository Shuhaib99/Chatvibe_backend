import nodeMailer from 'nodemailer'
import dotenv from 'dotenv';

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_PASSWORD
  },
  
});

dotenv.config()
export const sendOtp = (email) => {
  try {
    // console.log(email,"PORTER")
    return new Promise(async (resolve, reject) => {
      const otp = `${Math.floor(10000 + Math.random() * 99999)}`;
      // console.log(otp,"otpppppppp");
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Verify your email ",
        html: `Your email verification code is : ${otp}`,
      };
      // console.log(mailOptions,"mailoption///////////////////");
      // console.log(transporter,"transropl");
      await transporter.sendMail(mailOptions)
        .then((response) => {
          response.otp = otp;
          resolve(response);
        })
        .catch((err) => {
            console.log("ERROR OTP",err)
          resolve(err);
        });
    }).catch((err) => {
      reject(err);
    });
  } catch (err) {
    console.log("ERROR OCCURRED", err);
  }
};
