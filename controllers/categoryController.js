const category = require("../modals/CatagoryModel");

exports.getAllcategory = async (req, res) => {
  try {
    let allcategory = await category.find();
    if (!allcategory) {
      return res.status(400).json({
        success: false,
        message: "category not found",
      });
    }
    res.status(200).json({
      success: true,
      results: allcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const { name, subCategory, image, id } = req.body;
    console.log({ name, subCategory, image, id });
    // res.status(500).send("something went wrong");
    // return;
    if (!id) {
      const newcategory = await category.create({
        name,
        subCategory,
        image,
      });

      res.status(200).json(newcategory);
      console.log(newcategory);
    } else {
      let categoryDetail = await category.findByIdAndUpdate(
        id,
        {
          name,
          subCategory: subCategory || [],
          image,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      console.log(categoryDetail);

      res.status(200).json(categoryDetail);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    let deletecategory = await category.findById(id);
    if (!deletecategory) {
      return res.status(400).json({
        success: false,
        message: "category not found",
      });
    }
    await deletecategory.remove();
    res.status(200).json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
