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
        let content = req.body.Subject
        console.log(user,content)
        const maildetails = {
            usermail:user,
            mailsubject:'Portfolio Email',
            mailcontent:`<h1> from : ${user}</h1>
                            <h1>${content}</h1>`,
        };
         const mailresponse = await mailerfunc(maildetails)
         console.log(mailresponse)
         res.status(200).json({message:"Email sended"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somting went wrong"})
    }
})

app.listen(process.env.PORT || 5000)