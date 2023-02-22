const product = require("../modals/ProductModal");
const bcryptjs = require("bcryptjs");
//create product -- admin

exports.createProduct = async (req, res) => {
  let {
    title,
    id,
    description,
    price,
    rating,
    images,
    category,
    stock,
    numberOfReviews,
    offers,
    discount,
    deliveryTime,
    warranty,
  } = req.body;
  try {
    if (!id) {
      const newProduct = await product.create({
        title,
        description,
        price,
        rating,
        images,
        category,
        stock,
        numberOfReviews,
        offers,
        discount,
        deliveryTime,
        warranty,
      });
      console.log(newProduct);
      if (newProduct) {
        res.status(200).json({
          success: true,
          response: newProduct,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      let upProduct = await product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          price,
          rating,
          images,
          category,
          stock,
          numberOfReviews,
          offers,
          discount,
          deliveryTime,
          warranty,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      console.log(upProduct, "fsdfdsfds");
      if (!upProduct) {
        res.status(400).json({
          success: true,
          message: "something went wrong",
        });
        return;
      }
      res.status(200).json({
        success: true,
        response: upProduct,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const results = await product.find();
    res.status(200).json({
      status: true,
      TotalResults: results.length,
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//update product -- admin

exports.updateProduct = async (req, res, next) => {
  try {
    let upProduct = await product.findById(req.params.id);
    if (!upProduct) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    upProduct = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      upProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//delete product --admin

exports.deleteProduct = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    let deleteProduct = await product.findById(id);
    if (!deleteProduct) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    await deleteProduct.remove();
    res.status(200).json({
      success: true,
      deleteProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//get single product details
exports.getProductDetails = async (req, res, next) => {
  let { id } = req.params;
  try {
    let ProductDetail = await product.findById(id);
    if (!ProductDetail) {
      return res.status(200).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      response: ProductDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.globalSearch = async (req, res, next) => {
  const { keyword } = req.query;
  try {
    let result = await product.find();

    let filterarr = result.filter((data) => {
      return data.name.toLowerCase().includes(keyword.toLowerCase());
    });

    if (filterarr.length == 0) {
      return res.status(200).json({
        success: false,
        message: "No  products found ",
      });
    }
    res.status(200).json({
      success: true,
      TotalResults: filterarr.length,
      response: filterarr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.FilterData = async (req, res, next) => {
  try {
    let { gte, lte, rating } = req.query;

    let filtereddata = await product.find({
      $and: [
        { price: { $gte: Number(gte) || 0 } },
        { price: { $lte: Number(lte) || 100000 } },
        { rating: { $lte: Number(rating) } },
      ],
    });
    if (filtereddata.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No  products found ",
      });
    }

    res.send({
      success: true,
      TotalResults: filtereddata.length,
      response: filtereddata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.getCategorisedProducts = async (req, res, next) => {
  try {
    let { name } = req.params;
    console.log(name);
    let filtereddata = await product.find();
    let data = filtereddata.filter(
      (ele) => ele.category.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (filtereddata.length == 0) {
      return res.status(200).json({
        success: false,
        message: "No  products found ",
      });
    }
    console.log(data);
    res.send({
      success: true,
      response: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
