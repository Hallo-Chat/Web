const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected");
    } catch (e) {
        console.log("Connect faild");
    }
}

    module.exports = { connect }