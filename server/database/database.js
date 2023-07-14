const mongoose = require('mongoose');

function DatabaseConnection() {
    mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected!'));
}


module.exports = DatabaseConnection