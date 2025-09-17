import type { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token || token !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = {authMiddleware}