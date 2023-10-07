import NodeMailer from 'nodemailer'
import  express  from "express";

// const nodemailer = require('nodemailer');
import requestRouter from "./route-request.js";
import * as requestController from "../controllers/request-controller.js";

const routeEmail = express.Router();
// routeEmail.route('/').post(requestController.post);

routeEmail.get('/finalEmailId/:emailId', (req, res) => {
    // create a transporter object using nodemailer
    const emailId = req.params.emailId;
    const transporter = NodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'groupbarter123@gmail.com',
            pass: 'doloznolhtxguzla'
        }
    });

    // set up email data with unicode symbols
    const mailOptions = {
        from: 'groupbarter123@gmail.com',
        to: emailId,
        subject: 'Congratulations! Trade Request Accepted',
        html: '<p>Congratulations!! User has accepted your trade request :D</p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

export default routeEmail;