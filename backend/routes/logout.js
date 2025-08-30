import { Router } from "express";
import { Logout } from "../controller/logout.js";

const router = Router();

// Example route
router.get("/logout", Logout);

export default router;
