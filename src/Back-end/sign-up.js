const nodemailer = require('nodemailer')
const express = require('express')
const bodyPraser = require('body-parser')
const path = require('path')
const port = 7000
const app = express()
 


app.use(bodyPraser.urlencoded({ extended: true}))

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'narutotestmail@gmail.com',
        pass: 'podbmipgqzuehpux'
    }
})

// const sendEmail = (mailOptions) => {
//     transporter.sendMail(mailOptions,(err,info)=> {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('Email sent' + info.response);
//         }
//     })
// }
const sendEmail = (mailOptions, callback) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
        console.error('Error sending email:', err);
        callback(err);
        } else {
        console.log('Email sent:', info.response);
        callback(null, info);
        }
    });
};

//sign in (required : mail)

//The express.static middleware is used to serve static files from the specified directory.
app.use(express.static('../Front-end'))
app.use('/images', express.static(path.join(__dirname, '../../images')));


app.get('/', function (req, res) {
    res.contentType('.html')
    res.sendFile( path.join(__dirname, '../Front-end/Home.html') )
})

app.post('/', (req, res) => {
    let email = req.body.email;
    let subject = 'Ready to go!';
    let text = `Welcome to Netflix!\n
      Dear [USER NAME],\n
      Congratulations and welcome to Netflix! We're excited to have you as a new member of our streaming family. Your account has been successfully set up, and now you have access to a world of captivating entertainment.\n
      With Netflix, you can enjoy an incredible range of movies, TV shows, and documentaries right at your fingertips. Whether you're in the mood for a thrilling suspense series, a romantic comedy, or an eye-opening documentary, we've got you covered.\n
      We encourage you to explore our vast library of content and discover new favorites. Our recommendation system will also tailor suggestions based on your viewing history, so the more you watch, the better we can personalize your experience.\n
      If you have any questions or need assistance, our Help Center is available to provide guidance and support. We want your Netflix journey to be enjoyable and hassle-free.\n
      Once again, welcome to Netflix! Get ready to immerse yourself in a world of entertainment like never before.\n
      Happy streaming!\n
      Best regards,\n
      The Netflix-clone Team`;
  
    let mailOptions = {
      from: 'narutotestmail@gmail.com',
      to: email,
      subject: subject,
      text: text
    };
  
    sendEmail(mailOptions, (error, info) => {
        if (error) {
            // Handle email sending error
            console.error('Error sending email:', error);
            res.sendStatus(500); // Send HTTP 500 response for internal server error
        } else {
            // Email sent successfully
            res.sendFile(path.join(__dirname, '../Front-end/signinstep-1.html'));
        }
    });
});

//when choosed plan : mail - for code OTP

app.get('/signin', function (req, res) {
    res.contentType('.html')
    res.sendFile( path.join(__dirname, '../Front-end/signin.html') )
})

app.post('/signin', (req, res) => {
    let email = req.body.email;
    let subject = 'Ready to go!';
    let text = `Dear [User's Name],\n
         Thank you for choosing our services! To ensure the security of your account, we require a one-time password (OTP) for verification purposes. Please find your OTP below:\n\n
         OTP: [OTP Code]\n\n
         Please enter this OTP on the verification page within [time limit] to complete the verification process successfully. Please note that the OTP is case-sensitive.\n
         If you haven't requested this OTP or have any concerns about your account security, please contact our support team immediately at [COLLEGE E K J]. We take your privacy seriously and will assist you promptly.\n
         Thank you for your cooperation and for being a valued customer. We look forward to providing you with a seamless and secure experience.\n
         Best regards,\n
         HEAD\n
         NETFLIX-CLONE\n`;
  
    let mailOptions = {
      from: 'narutotestmail@gmail.com',
      to: email,
      subject: subject,
      text: text
    };
  
    sendEmail(mailOptions, (error, info) => {
        if (error) {
            // Handle email sending error
            console.error('Error sending email:', error);
            res.sendStatus(500); // Send HTTP 500 response for internal server error
        } else {
            // Email sent successfully
            res.sendFile(path.join(__dirname, '../Front-end/signinstep-1.html'));
        }
    });
});

// app.get('/signinstep-1', function (req, res) {
//     res.contentType('.html')
//     res.sendFile('../Front-end/signinstep-1.html',{root: __dirname})
// })

// app.post('/signinstep-1', (req,res) => {
//     res.send(`email is : ${req.body.email}`)
//     let email = req.body.email

//     let subject = 'Your One-Time Password (OTP) for Account Verification'
//     let text = `Dear [User's Name],\n
//     Thank you for choosing our services! To ensure the security of your account, we require a one-time password (OTP) for verification purposes. Please find your OTP below:\n\n
//     OTP: [OTP Code]\n\n
//     Please enter this OTP on the verification page within [time limit] to complete the verification process successfully. Please note that the OTP is case-sensitive.\n
//     If you haven't requested this OTP or have any concerns about your account security, please contact our support team immediately at [COLLEGE E K J]. We take your privacy seriously and will assist you promptly.\n
//     Thank you for your cooperation and for being a valued customer. We look forward to providing you with a seamless and secure experience.\n
//     Best regards,\n
//     HEAD\n
//     NETFLIX-CLONE\n` 

//     let mailOptions = {
//         from: 'narutotestmail@gmail.com',
//         to: email ,
//         subject: subject ,
//         text: text
//     };
//     sendEmail(mailOptions);

//     res.redirect('/signinstep2.html');
// })

  //when account is set up



  
app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
  });