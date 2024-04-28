const User = require("../models/User");

// imports the CryptoJS library, which is used for encryption and decryption purposes.
const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
      // password provided in the request body is encrypted using CryptoJS.AES.encrypt
      // and the process.env.SECRET value. The encrypted password is then stored in
      // the password field of the newUser object.
    });
    // The try-catch block is used to handle any errors that may occur during the database operation.
    try {
      await newUser.save();
      // newUser object is saved to the database using the save() method, which returns a promise.

      res.status(201).json({ message: "User successfully created" });
      // statusCode 201 indicates a successful creation
      // If the user is successfully saved, the we are passing a message as our response
    } catch (error) {
      res.status(500).json({ message: error });
      // If an error occurs during the database operation, the catch block is executed. The error
      //  is returned as a JSON response with a status code of 500 (indicating a server error)
    }
  },

  // loginUser: async (req, res) => {
  //     try {
  //         const user = await User.findOne({ email: req.body.email });
  //         !user && res.status(401).json("Wrong Login Details")

  //         const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
  //         const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);

  //         decryptedPass !== req.body.password && res.status(401).json("Wrong Login Details");

  //         const userToken = jwt.sign({
  //             id: user.id
  //         }, process.env.JWT_SEC,
  //             { expiresIn: "7d" });

  //         const { password, __v, createdAt, ...others } = user._doc;

  //         res.status(200).json({ ...others, token: userToken });

  //     } catch (error) {
  //         res.status(500)
  //     }
  // }
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong email or password.");
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if (decryptedPass !== req.body.password) {
        return res.status(401).json("Wrong email or password.");
      }

      const userToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
        expiresIn: "7d",
      });
      const { password, __v, createdAt, ...others } = user._doc;

      res.status(200).json({ ...others, token: userToken });
    } catch (error) {
      res.status(500).json("Server Error");
    }
  },
};
