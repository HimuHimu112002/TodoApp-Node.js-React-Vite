const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovedSchema = new Schema({
    approvedname:{ 
        type: String,
    },
    approveddiscription:{ 
        type: String,
    },
    approvedcategory:{ 
        type: String,
    },
    approvedstatus:{ 
        type: String,
    },
    
});

module.exports = mongoose.model('Approved', ApprovedSchema);