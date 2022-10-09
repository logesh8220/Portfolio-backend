const nodemailer = require('nodemailer')
require('dotenv').config()
const mailerfunc = async (requiredOptions) =>{
    const {usermail,mailsubject,mailcontent} = requiredOptions;
    try {
        let sender = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            },
            tls:{
                rejectUnauthorized:false
            }
        })
        let mailoptions ={
            from:usermail,
            to:process.env.EMAIL,
            subject:mailsubject,
            html:mailcontent,
        }
        const mailResult = await sender.sendMail(mailoptions);
        return mailResult
    } catch (error) {
        console.log(error.message, "error in node mailer")
    }
}
module.exports = mailerfunc;