"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app = require("../app");
describe("Wallet API", () => {
    it("should fund wallet successfully", async () => {
        const res = await request(app)
            .post("/wallet/fund")
            .set("Authorization", `Bearer ${process.env.API_KEY}`)
            .send({ userId: 1, amount: 500 });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Wallet funded successfully");
    });
    it("should not allow funding with negative amount", async () => {
        const res = await request(app)
            .post("/wallet/fund")
            .set("Authorization", `Bearer ${process.env.API_KEY}`) // ✅ auth header
            .send({ userId: 1, amount: -100 });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "Invalid amount");
    });
});
//# sourceMappingURL=wallet.test.js.map