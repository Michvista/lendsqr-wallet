"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { registerUser } = require("../controllers/userController");
const router = express.Router();
router.post("", authMiddleware, registerUser);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map