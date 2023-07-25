const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendEmail = require('./emailSender');
const database = require('./database');

const app = express();
const port = 7000;
let lastMail = ''

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../Front-end')));
app.use('/images', express.static(path.join(__dirname, '../../images')));

app.get('/', function (req, res) {
  res.contentType('.html');
  res.sendFile(path.join(__dirname, '../Front-end/Home.html'));
});


// Get started 
app.post('/', async (req, res) => {
  const email = req.body.email.trim();
  try {
    // Sending email
    const mailOptions = {
      from: 'narutotestmail@gmail.com',
      to: email,
      subject: 'Ready to go!',
      text: `Welcome to Netflix!\n\nDear [USER NAME],\n\nCongratulations and welcome to Netflix! We're excited to have you as a new member of our streaming family. Your account has been successfully set up, and now you have access to a world of captivating entertainment.\n\nWith Netflix, you can enjoy an incredible range of movies, TV shows, and documentaries right at your fingertips. Whether you're in the mood for a thrilling suspense series, a romantic comedy, or an eye-opening documentary, we've got you covered.\n\nWe encourage you to explore our vast library of content and discover new favorites. Our recommendation system will also tailor suggestions based on your viewing history, so the more you watch, the better we can personalize your experience.\n\nIf you have any questions or need assistance, our Help Center is available to provide guidance and support. We want your Netflix journey to be enjoyable and hassle-free.\n\nOnce again, welcome to Netflix! Get ready to immerse yourself in a world of entertainment like never before.\n\nHappy streaming!\n\nBest regards,\n\nThe Netflix-clone Team`
    };
    await sendEmail(mailOptions);

    res.redirect('/signinstep-1.html')
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }
});


// Signin
app.get('/signin', function (req, res) {
    res.contentType('.html');
    res.sendFile(path.join(__dirname, '../Front-end/signin.html'));
});
  
app.post('/signin', async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password
  
    try {
        await database.checkLoginCredentials(email, password)
        .then(isValid => {
            if (isValid) {
                const mailOptions = {
                    from: 'narutotestmail@gmail.com',
                    to: email,
                    subject: 'Welcome back to Netflix-clone!',
                    text: `Dear [User's Name],\nWe're thrilled to have you back on Netflix-clone! Thanks for logging in to your account. Get ready to dive into a world of captivating entertainment.\nEnjoy streaming your favorite movies, TV shows, and exclusive originals on our platform. We're committed to providing you with a seamless and enjoyable experience.\nIf you have any questions or need assistance, our support team is here to help. Just reach out, and we'll be happy to assist you.\nHappy streaming!\nBest regards,\nThe Netflix-clone Team`
                };
                sendEmail(mailOptions);
                res.send('Data saved successfully');

            } else {
                console.log("something wrong in email, password")
                res.send('Data not Found!')
            }
        })
        .catch(error => {
            console.error('Error checking credentials:', error);
            console.error('Error:', error);
            res.sendStatus(500);
        });
  
    } catch (error) {
      console.error('Error:', error);
      res.sendStatus(500);
    }
});

// signin reg form
app.get('/sigin-regform', function (req, res) {
    console.log("hello2");
    res.contentType('.html');
    res.sendFile(path.join(__dirname, '../Front-end/signin-regform.html'));
});

app.post('/sigin-regform', async (req, res) => {
    console.log("hello3");
    const email = req.body.emailSigninreg.trim();
    lastMail = email
    const password = req.body.passwordSiginreg
  
    try {
        // Save email to the database
        await database.saveEmailToDatabase(email,password)      
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }

    res.redirect('/signinstep-2.html')
});

// final mail
app.get('/plans', function (req, res) {
    res.contentType('.html');
    res.sendFile(path.join(__dirname, '../Front-end/plans.html'));
});
  
app.post('/plans', (req, res) => {
    const mailOptions = {
        from: 'narutotestmail@gmail.com',
        to: lastMail,
        subject: 'Your Netflix Clone Plan is Active! Enjoy Unlimited Streaming!',
        text: `Dear [User],\nCongratulations! We are thrilled to inform you that your chosen plan for the Netflix Clone service has been successfully activated. You now have full access to our extensive collection of movies, TV shows, and exclusive content.\nWith our Netflix Clone, you can indulge in hours of entertainment, discover new favorites, and enjoy uninterrupted streaming anytime, anywhere. Whether you're a fan of thrilling dramas, hilarious comedies, or captivating documentaries, we have something for everyone.\nSo, grab your popcorn, sit back, and immerse yourself in the world of unlimited entertainment. Explore different genres, create personalized watchlists, and dive into binge-worthy series that will keep you hooked.\nIf you have any questions, concerns, or need assistance with your account, our dedicated support team is always ready to help. Feel free to reach out to us at support@netflix-clone.com.\nThank you for choosing Netflix Clone. We hope you have an incredible streaming experience!\n\nBest regards,\nThe Netflix Clone Team\n`
    };
    sendEmail(mailOptions);
    res.redirect('/signinstep-2.html')
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});