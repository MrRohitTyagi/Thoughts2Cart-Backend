const siteSettings = require("../modals/AdminsettingsModal");

exports.getAllAdminSettings = async (req, res) => {
  try {
    const { id, data } = req.params;
    const UpdatedSettings = await siteSettings.findById(id);
    console.log(UpdatedSettings);
    res.status(200).json(UpdatedSettings);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
    console.log(error);
  }
};

exports.saveAdminSetings = async (req, res) => {
  try {
    const { id, data } = req.body;
    if (id) {
      const UpdatedSettings = await siteSettings.findByIdAndUpdate(
        id,
        { data },
        { new: true }
      );
      console.log(UpdatedSettings);
      res.status(200).json(UpdatedSettings);
    } else {
      res.status(400).send("is noot found");
      console.log("ID NOT FOUND");
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
    console.log(error);
  }
};
