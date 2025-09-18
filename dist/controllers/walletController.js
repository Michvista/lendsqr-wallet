"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../config/db");
async function fundWallet(req, res) {
    const { userId, amount } = req.body;
    if (amount <= 0)
        return res.status(400).json({ error: "Invalid amount" });
    try {
        await db("wallets").where({ user_id: userId }).increment("balance", amount);
        return res.json({ message: "Wallet funded successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
async function transferFunds(req, res) {
    const { fromUserId, toUserId, amount } = req.body;
    if (amount <= 0)
        return res.status(400).json({ error: "Invalid amount" });
    const trx = await db.transaction();
    try {
        const sender = await trx("wallets").where({ user_id: fromUserId }).first();
        if (!sender || sender.balance < amount) {
            await trx.rollback();
            return res.status(400).json({ error: "Insufficient funds" });
        }
        await trx("wallets").where({ user_id: fromUserId }).decrement("balance", amount);
        await trx("wallets").where({ user_id: toUserId }).increment("balance", amount);
        await trx.commit();
        return res.json({ message: "Transfer successful" });
    }
    catch (err) {
        await trx.rollback();
        return res.status(500).json({ error: err.message });
    }
}
async function withdrawFunds(req, res) {
    const { userId, amount } = req.body;
    if (amount <= 0)
        return res.status(400).json({ error: "Invalid amount" });
    try {
        const wallet = await db("wallets").where({ user_id: userId }).first();
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }
        await db("wallets").where({ user_id: userId }).decrement("balance", amount);
        return res.json({ message: "Withdrawal successful" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
module.exports = { withdrawFunds, transferFunds, fundWallet, };
//# sourceMappingURL=walletController.js.map