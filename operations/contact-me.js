const nodemailer = require('nodemailer');

const sendEmail = async (contactObject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'areez.visram10@gmail.com',
            pass: 'kzhldqmtrepvpfnt'
        }
    });

    const { name, email_address, message } = contactObject

    const mailOptions = {
        from: 'areez.visram10@gmail.com',
        to: 'areez.visram10@gmail.com',
        subject: 'New Form Entry',
        text: `Name: ${name} \nEmail: ${email_address} \nMessage: ${message}`
    }

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendEmail
}