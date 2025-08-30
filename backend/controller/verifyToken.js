import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  try {
    const token = req.cookies.accessToken; // ✅ token from cookie
    if (!token) return res.status(401).json({ success: false, message: "No token" });

    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ success: true, user: data });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
