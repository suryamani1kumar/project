import { generateTokens } from "../utils/utils.js";

 const dummyUser = {
      _id: "123456",
      fullname: "Admin User",
      email: "admin@tireless.net",
      password: "tireless@Admin",
    };

export const userLogin = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email/Username and Password are required" });
  }

  // Dummy user validation
  if (email !== "admin@tireless.net") {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (password !== "tireless@Admin") {
    return res.status(400).json({ message: "Password not match" });
  }

  const payload = { email: email, password: password };

  const { accessToken, refreshToken } = generateTokens(
    payload,
    process.env.ACCESS_TOKEN_TIME,
    process.env.REFRESH_TOKEN_TIME
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};
