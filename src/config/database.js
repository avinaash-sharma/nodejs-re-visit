const mongoose = require('mongoose');

const connectionDB = async () => {
    await mongoose.connect('mongodb+srv://avirohit13:Avinash_1994@avinashsharmaproject01.htgdm.mongodb.net/devBumble');
}

module.exports = { connectionDB }