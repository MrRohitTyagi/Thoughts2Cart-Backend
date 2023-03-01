const user = require("../modals/UserModal");
const becrypt = require("bcryptjs");
//regester a user

exports.regesterUser = async (req, res) => {
  try {
    const {
      orders,
      wishlist,
      name,
      email,
      password,
      profile,
      phone,
      id,
      role,
      isPassChanded,
      address,
    } = req.body;
    if (!id) {
      const newuser = await user.create({
        wishlist,
        name,
        email,
        role,
        password,
        address,
        profile,
        phone,
        orders,
      });

      res.status(200).json(newuser);
    } else {
      let encryptedPass =
        isPassChanded === true ? await becrypt.hash(password, 10) : password;
      let UserDetail = await user.findByIdAndUpdate(
        id,
        {
          orders,
          wishlist,
          password: encryptedPass,
          name,
          email,
          role: role || "user",
          profile: profile || "",
          phone,
          address,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      console.log(UserDetail);

      res.status(200).json(UserDetail);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message:
        err.code === 11000
          ? "User already exists !"
          : "Please enter a valid email !",
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id, email, password } = req.query;

    if (email) {
      let UserDetail = await user.find({ email: email });
      console.log(UserDetail);
      if (UserDetail.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No user found",
        });
      }
      console.log(password, "testbjkdfbsdfbasbdjfas");
      await becrypt.compare(
        password,
        UserDetail[0].password,
        function (err, result) {
          if (result === true) {
            res.status(200).json({
              success: true,
              user: UserDetail[0],
            });
          } else {
            res.status(400).json({
              success: false,
              message: "User not found ",
            });
          }
        }
      );
    } else if (id) {
      let UserDetail = await user.findById(id);
      if (UserDetail) {
        return res.status(200).json({
          success: true,
          user: UserDetail,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    let deleteuser = await user.findById(id);
    if (!deleteuser) {
      return res.status(200).json({
        success: false,
        message: "user not found",
      });
    }
    await deleteuser.remove();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    let allUsers = await user.find();
    if (!allUsers) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      results: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.matchPasswords = async (req, res) => {
  const { newPassword, confirmPass, id } = req.query;
  try {
    let UserDetail = await user.find({ _id: id });
    if (UserDetail.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    await becrypt.compare(
      confirmPass,
      UserDetail[0].password,
      async function (err, result) {
        if (result === true) {
          let encryptedPass = await becrypt.hash(newPassword, 10);
          let updateduser = await user.findByIdAndUpdate(
            id,

            {
              password: encryptedPass,
              name: UserDetail[0].name,
              wishlist: UserDetail[0].wishlist,
              email: UserDetail[0].email,
              role: UserDetail[0].role || "user",
              profile: UserDetail[0].profile || "",
              phone: UserDetail[0].phone,
              address: UserDetail[0].address,
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
        }
        res.status(200).json({
          success: result,
          msg: result ? "Password Updated successfully!" : " Invalid Password",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "something went wrong" });
  }
};
