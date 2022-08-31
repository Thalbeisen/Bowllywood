require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Nodemailer Transport Ready!');
        console.log(success);
    }
});

module.exports.sendConfirmationEmail = (
    firstName,
    lastName,
    email,
    confirmationCode
) => {
    console.log('Check');
    transporter
        .sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Veuillez confirmer votre adresse mail',
            html: `<h1>Vérification d'adresse mail<h1>
        <h2>Merci pour votre inscription "+${firstName}+" "+${lastName}</h2>
        <p>Veuillez confirmer votre adresse mail en cliquant sur <a href="http://localhost:3000/user"+${email}+"/confirm/"+${confirmationCode}>ici</a>`,
        })
        .catch((err) => console.log(err));
    console.log(transporter);
};
