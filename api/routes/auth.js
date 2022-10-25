const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var crypto = require('crypto');


// router.get('/register', async (req, res) => {
//    const user = await new User({
//     username: "huydinh",
//     email: "huydinhse@gmail.com",
//     password: "11111111"
//    });

//    await user.save();
//    res.send("ok");
// });

//Register

router.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });
        console.log("testttttttttttttttttttttttt verify");
        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            res.redirect('/auth/login')
        }
        else {
            res.redirect('/auth/register')
            console.log("Email is not verify");
        }
    }
    catch (err) {

    }
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'worldbook.www@gmail.com',
        pass: 'gmgkonnlllrhqtmr'
    },
    tls: {
        rejectUnauthorized: false,
    }
})

router.post('/register', async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // New User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        });

        var mailOptions = {
            from: '"Verify your email" <<worldbook.www@gmail.com>>',
            to: newUser.email,
            subject: 'Hallo App - Verify your email',
            html: `<h2>${newUser.username}! Thanks for register on our site</h2>
                    <h4> Please verify your email to continue...</h4>
                    <a href="https://${req.headers.host}/api/auth/verify-email?token=${newUser.emailToken}">Verify your Email</a>`
        }
        //send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Verify email is send to your gmail account");
            }
        })

        // save user and respon
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});


//Login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json("error");
    }

});

router.get('/', (req, res) => {
    res.send("Auth");
});

module.exports = router;