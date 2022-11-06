const userModel = require("../model/user_model");

exports.getAllUsers = async function (req, res, next) {
  try {
    const Users = await userModel.find();
    return res
      .status(200)
      .json({ message: "success", result: Users.length, Users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async function (req, res, ) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, user });
  } catch (error) {
    return res.status(404).json({ message: "can't get user by id", error });
  }
};

exports.updateUser = async function (req, res, ) {
  try {
    const { userId } = req.params;
    console.log (userId);
    const userDetails = req.body;

    const user = userModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ status: false, order: null });
    }
    await userModel.findByIdAndUpdate(userId, userDetails, {
      runValidators: true, // Runs validations for the updated fields
    });

    return res.json({ status: true });
  } catch (error) {
   return res.status(404).json({ message: "user update unsuccessful", error });
  }
};

exports.deleteUser = async function (req, res, ) {
  try {
    const { userId } = req.params;
    // console.log (userId);

    const user = await userModel.findById(userId);
    console.log(user._id);
    if (!user) {
      return res.status(404).json({ status: false, order: null });
    }
    // console.log(user);
    await userModel.deleteOne(user, {
      
      runValidators: true, // Runs validations for the updated fields
    });

    return res.json({ status: true });
  } catch (error) {
   return res.status(404).json({ message: "user update unsuccessful", error });
  }
};

// exports.deleteUser = async function (req, res,) {
//   try {
//     console.log(req.params);
//     const { userId } = req.params;
// console.log(userId)
//     const userToBeDeleted = userModel.findByIdAndDelete( userId);
// console.log(userToBeDeleted)
//     return res.json({ status: true, userToBeDeleted });
//   } catch (error) {
//    return res.status(401).json({ message: "user deletion failed", error });
//   }
// };
