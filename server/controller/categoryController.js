const CategoryModel = require("../model/taskCategoryModel.js")

let CategoryController = async (req, res)=>{

    const {name} = req.body;
    let category = new CategoryModel({
        name,
    });
    category.save();
    res.send({category: "success"});

}

async function GetAlltodoCategory(req, res) {
    const data = await CategoryModel.find({})
    res.send(data)
}
module.exports = {CategoryController,GetAlltodoCategory}
