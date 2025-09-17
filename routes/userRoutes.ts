const  express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

router.post("", authMiddleware, registerUser);

module.exports = router;