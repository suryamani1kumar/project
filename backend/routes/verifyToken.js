import { Router } from "express";
import { verifyToken } from "../controller/verifyToken.js";

const router = Router();

// Example route
router.get("/verify", verifyToken);

export default router;
