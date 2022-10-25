const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        name: {
            type: String, unique: true,
        },
        isGroup: {
            type: 'boolean'
        },
        avatar: {
            type: 'array', default: [],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);