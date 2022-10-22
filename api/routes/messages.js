const router = require('express').Router();
const Messenger = require('../models/Message');
const multer = require('multer')
const fs = require('fs');

// add
router.post('/', async (req, res) => {
    const newMessage = new Messenger(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (e) {
        res.status(500).json(e);
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now() + uniqueSuffix}_${file.originalname}`);
    }
})

const upload = multer({ storage: storage }).single("file");

//upload files
router.post('/uploadfile', async (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.status(err).json({ success: false, err });
        }
        return res.status(200).json({ success: true, url: res.req.file.path });
    })
});

//get
router.get('/:conversationsId', async (req, res) => {
    try {
        const messages = await Messenger.find({
            conversationsId: req.params.conversationsId,
        });
        res.status(200).json(messages);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;




// fileFilter: (req, file, cb) =>{
//     const ext = path.extname(file.originalname)
//     if (ext !== '.jpg' && ext !== '.png' & ext !== '.mp4') {
//     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//     }
//     cb(null, true);
// }