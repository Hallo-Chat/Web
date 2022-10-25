const router = require('express').Router();
const Conversation = require('../models/Conversation');

// new conv
router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.post('/addgroup', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.userA, req.body.userB, req.body.userC],
        name: req.body.name,
        isGroup: req.body.isGroup,
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (e) {
        res.status(500).json(e);
    }
})

//get conv of a user
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    }
    catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;