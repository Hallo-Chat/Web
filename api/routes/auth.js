const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


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
router.post('/register', async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // New User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

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
        const user = await User.findOne({email:req.body.email});
        !user && res.status(400).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
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