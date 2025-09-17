
const { createUser, getUserByEmail } = require("../models/User");
const { checkKarma } = require("../services/karmaService");
const db = require("../config/db");

import type { Request, Response } from "express";

async function registerUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Check if already exists
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Karma check
    const karmaResult = await checkKarma(email);
    if (!karmaResult.eligible) {
      return res.status(403).json({
        error: "User is blacklisted by Karma",
        reason: karmaResult.reason || "Not eligible",
      });
    }

    // Create user
    const user = await createUser(name, email, false);

    // Create wallet for the user
    await db("wallets").insert({ user_id: user.id, balance: 0 });

    return res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { registerUser };
