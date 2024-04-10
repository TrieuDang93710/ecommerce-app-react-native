const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dangbinhtrieu123@gmail.com",
      pass: "trieubd@93710",
    },
  });
  const mailOptions = {
    from: "dangbinhtrieu123@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://localhost:3000/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const newUser = new User({ name, email, password });
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
      await newUser.save();
      sendVerificationEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
      console.log("Error registing user");
    }
  },
  getVerify: async (req, res) => {
    try {
      const token = req.params.token;
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
      user.verified = true;
      user.verificationToken = undefined;

      await user.save();
    } catch (error) {
      res.status(500).json({ message: "Email verification Failed" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ userId: user._id }, secretKey);
      console.log(token);
      return res.status(200).json({ message: "Loggin Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  },
};
module.exports = userController;
