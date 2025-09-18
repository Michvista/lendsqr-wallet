"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token || token !== `Bearer ${process.env.API_KEY}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}
module.exports = { authMiddleware };
//# sourceMappingURL=auth.js.map