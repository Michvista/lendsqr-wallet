"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { fundWallet, transferFunds, withdrawFunds } = require("../controllers/walletController");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();
router.post("/fund", authMiddleware, fundWallet);
router.post("/transfer", authMiddleware, transferFunds);
router.post("/withdraw", authMiddleware, withdrawFunds);
module.exports = router;
//# sourceMappingURL=walletRoutes.js.map