"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../config/db");
async function createUser(name, email, blacklisted) {
    const [id] = await db("users").insert({ name, email, blacklisted });
    const user = await db("users").where({ id }).first();
    return user;
}
function getUserByEmail(email) {
    return db("users").where({ email }).first();
}
module.exports = { createUser, getUserByEmail };
//# sourceMappingURL=User.js.map