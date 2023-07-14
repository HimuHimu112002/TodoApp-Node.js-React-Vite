const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cancelSchema = new Schema({
    cancelname:{ 
        type: String,
    },
    canceldiscription:{ 
        type: String,
    },
    cancelcategory:{ 
        type: String,
    },
    cancelstatus:{ 
        type: String,
    }
});

module.exports = mongoose.model('Cancel', cancelSchema);