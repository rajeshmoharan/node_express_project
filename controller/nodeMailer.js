
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'leonardo.marvin83@ethereal.email',
    pass: 'SmdHpwpkusZCyuzh26'
  }
});


async function main() {
 
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <rajesh.edevlop@gmail.com>', 
    to: "210720100121@cutm.ac.in", 
    subject: "Sign Up Succesfull", 
    text: "Welcome", 
    html: "<b>Sign Up Successfully</b>", 
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
 
}

main().catch(console.error);
