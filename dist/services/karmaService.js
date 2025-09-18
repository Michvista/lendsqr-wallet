"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const fetch = require("node-fetch");
const BASE_URL = process.env.BASE_URL;
async function checkKarma(identity) {
    try {
        const res = await fetch(`${BASE_URL}/${identity}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Accept": "application/json",
            },
        });
        if (!res.ok) {
            const text = await res.text();
            console.error(" Karma API error:", res.status, text);
            return { eligible: false, reason: `Karma API error: ${res.status}` };
        }
        const data = await res.json();
        console.log("✅ Karma data:", data);
        // If API returns a record → user is blacklisted
        if (data && data.karma_identity) {
            return { eligible: false, reason: data.reason || "Blacklisted in Karma" };
        }
        // If no record => user is good
        return { eligible: true };
    }
    catch (err) {
        console.error(" Karma check failed:", err.message);
        return { eligible: false, reason: "Karma service unavailable" };
    }
}
module.exports = { checkKarma };
//# sourceMappingURL=karmaService.js.map