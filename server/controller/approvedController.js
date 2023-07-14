const ApprovedModel = require("../model/approvedModel.js")

let ApprovedControllerSection = async (req, res)=>{

    const {approvedname,approveddiscription,approvedcategory,approvedstatus} = req.body;
    let approved = new ApprovedModel({
        approvedname,
        approveddiscription,
        approvedcategory,
        approvedstatus,
    });
    approved.save();
    res.send({category: "success approved"});

}


async function GetAlltodoApproved(req, res) {
    const data = await ApprovedModel.find({})
    res.send(data)
}

async function TodoDataApprovedInPending(req, res) {
    const {id} = req.body
    await ApprovedModel.findByIdAndDelete(id)
    res.send(" approved delete hoise")
}

module.exports = {ApprovedControllerSection,GetAlltodoApproved,TodoDataApprovedInPending}