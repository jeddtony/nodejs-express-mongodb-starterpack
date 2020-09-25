const nodemailer = require("nodemailer");
let hbs = require("nodemailer-express-handlebars");

const verifyEmail = ({view, ...variables}) => {
  console.log('showing the email view ', view)  ;
  // process.exit();
  let options = {
        viewEngine:{

        extname: ".handlebars",
        layoutsDir: "views/",
        defaultLayout: view
    },
    viewPath: "views/"
}

let smtpTransport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    tls: true,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
  });

  smtpTransport.use('compile', hbs(options));

  const mailOptions = {...variables};

  smtpTransport.sendMail(mailOptions);
}

exports.sendVerifyEmail = () => {
    verifyEmail({view:"welcome", template: "welcome",
  to: "me@mail.com",
subject: "Welcome ",
  from: "starterpack@mail.com"} )
}