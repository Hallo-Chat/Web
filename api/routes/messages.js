const router = require('express').Router();
const Messenger = require('../models/Message');

// add
router.post('/', async (req, res) => {
    const newMessage = new Messenger(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch(e){
        res.status(500).json(e);
    }
});

//get
router.get('/:conversationsId', async (req, res) => {
    try{
        const messages = await Messenger.find({
            conversationsId: req.params.conversationsId,
        });
        res.status(200).json(messages);
    } catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;