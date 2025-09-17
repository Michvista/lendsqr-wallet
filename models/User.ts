const db = require("../config/db");

async function createUser(name: string, email: string, blacklisted: boolean) {
  const [id] = await db("users").insert({ name, email, blacklisted });

  const user = await db("users").where({ id }).first();
  return user;
}


function getUserByEmail(email: string) {
  return db("users").where({ email }).first();
}

module.exports = { createUser, getUserByEmail };
