const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

exports.deleteImage = async (req, res) => {
  try {
    const { url } = req.query;
    const splitUrl = url.split("/");
    if (splitUrl.length < 2) {
      res.send({ message: "Image not found" });
      return;
    }
    const imageName = splitUrl.at(splitUrl.length - 1).split(".")[0];

    let { result } = await cloudinary.uploader.destroy(imageName);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Something went wrong");
  }
};
