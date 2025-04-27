import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
// import otpGenerator from "otp-generator";
// import { sendMail } from "../common/mail.js";

export const authController = {
  async register(req, res, next) {
    try {
      const body = req.body;
      const user = new User(body);

      // Optionally, validate the password confirmation
      // if (body.password !== body.confirmPassword) {
      //     return res.status(400).json("Invalid confirmPassword");
      // }

      await user.save();

      // Example of OTP generation and mailing (commented out)
      // const otp = otpGenerator.generate(6, {
      //   upperCaseAlphabets: false,
      //   digits: true,
      //   specialChars: false,
      // });
      // sendMail(body.email, `this is your OTP:${otp}`);
      // const currentOtp = new Otp({ code: otp, author_id: user._id });
      // await currentOtp.save();

      res.status(201).json({
        message: "User registered",
        data: user,
      });
    } catch (error) {
      if (error.code === 11000) {
        error.message = "User already exists";
        error.code = 400;
        return res.status(400).json(error);
      }
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const body = req.body;

      if (!body.email || !body.password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email: body.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (body.password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        sub: user.id,
        role: user.role,
        name: user.name,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      res.status(200).json({
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  },

  async profile(req, res, next) {
    try {
      const user = req.user; // Assuming the user is attached to `req.user` after auth middleware

      res.status(200).json({
        message: "User profile",
        data: user,
      });
    } catch (error) {
      res.status(500).send("Server error");
    }
  },

  async logout(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
      }

      const user = await User.findById(decodedToken.sub);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  },

  // OTP-related code (optional, if needed):
  // generateOtp() {
  //   return otpGenerator.generate(6, {
  //     upperCaseAlphabets: false,
  //     specialChars: false,
  //   });
  // },

  // async verify(req, res, next) {
  //   try {
  //     const body = req.body;
  //     const user = await User.findOne({ username: body.username });
  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     const otp = await Otp.findOne({ code: body.code });
  //     if (!otp) {
  //       throw new Error("OTP is not valid");
  //     }

  //     await User.findByIdAndUpdate(user._id, { $set: { isActive: "active" } });
  //     await Otp.findByIdAndDelete(otp._id);

  //     res.send("OTP verified and account activated");
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deleted",
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
