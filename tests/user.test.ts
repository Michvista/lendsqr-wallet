const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_KEY}`) // ✅ auth header
      .send({
        name: "John Doe",
        email: "johnnydoe@example.com",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "johnnydoe@example.com");
  });

  it("should not create a user with existing email", async () => {
    await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({
        name: "Jane Doe",
        email: "johnnydoe@example.com",
      });

    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${process.env.API_KEY}`) 
      .send({
        name: "Jane Doe",
        email: "johnnydoe@example.com",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });
});
