const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();



exports.onDelete = functions.auth
  .user()
  .onDelete((user) => {
    admin.firestore().collection("userProfiles").doc(user.uid).delete()
  });



//google account credentials used to send email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.firestore
  .document("inquirys/{inquirysId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `pham <shogo.jinta@gmail.com>`,
      to: snap.data().email,
      subject: "【pham】お問い合わせ完了!",
      html: `<h1>お問い合わせ頂き、ありがとうございます！</h1>
            <p>お問い合わせ頂き、誠にありがとうございます。</p>
            <p>弊社スタッフより3営業日以内に、折返しヒアリングのご連絡をさせて頂きます。</p>
            <p>今しばらくお待ち下さいませ。</p>
            <p><b>pham</b></p>
            <p><b>Email: </b>${snap.data().email}<br></p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });
  });
