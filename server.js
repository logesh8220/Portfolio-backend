const express = require('express')
const nodemailer = require('nodemailer')
const mailerfunc = require('./Mailer/Mailer')
const cors = require("cors");
require("dotenv").config();

const app = express()


//MiddleWare
app.use(cors())
app.use(express.json())


app.post('/api/sendmail' ,async function(req,res){
    try {
        let user = req.body.Email
        let Subject = req.body.Subject
        let Message = req.body.Message
        console.log(user,Subject,Message)
        const maildetails = {
            usermail:user,
            mailsubject:Subject,
            mailcontent:`<h1> From ${user} For : ${Subject}</h1>
                            <h1>${Message}</h1>`,
        };
         const mailresponse = await mailerfunc(maildetails)
         console.log(mailresponse)
         res.status(200).json({message:"Email sended"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somting went wrong"})
    }
})

app.listen(process.env.PORT || 6000)