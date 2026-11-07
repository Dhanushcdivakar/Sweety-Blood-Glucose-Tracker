import request from "supertest";
import app from "../app.js";
import prisma from "../config/prisma.js";

let token;
let secondUserToken;
let readingId;
let testEmail;
let secondUserEmail;

const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

beforeAll(async () => {
  await prisma.$connect();

  testEmail = `test${Date.now()}@example.com`;
  secondUserEmail = `second${Date.now()}@example.com`;

  const firstUser = await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: testEmail,
    password: "password123",
  });

  token = firstUser.body.token;

  const secondUser = await request(app).post("/api/auth/register").send({
    name: "Second User",
    email: secondUserEmail,
    password: "password123",
  });

  secondUserToken = secondUser.body.token;
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
        in: [testEmail, secondUserEmail],
      },
    },
  });

  await prisma.$disconnect();
});

describe("Reading API", () => {
  test("should reject requests without authentication", async () => {
    const response = await request(app).get("/api/readings");

    expect(response.statusCode).toBe(401);
  });

  test("should create a glucose reading", async () => {
    const response = await request(app)
      .post("/api/readings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: today,
        slot: "MORNING_FASTING",
        value: 110,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    readingId = response.body.reading.id;
  });

  test("should reject duplicate slots", async () => {
    const response = await request(app)
      .post("/api/readings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: today,
        slot: "MORNING_FASTING",
        value: 120,
      });

    expect(response.statusCode).toBe(409);
  });

  test("should reject invalid glucose values", async () => {
    const response = await request(app)
      .post("/api/readings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: today,
        slot: "AFTER_BREAKFAST",
        value: 700,
      });

    expect(response.statusCode).toBe(400);
  });

  test("should reject future dates", async () => {
    const response = await request(app)
      .post("/api/readings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: tomorrow,
        slot: "AFTER_BREAKFAST",
        value: 120,
      });

    expect(response.statusCode).toBe(400);
  });

  test("should retrieve the user's readings", async () => {
    const response = await request(app)
      .get("/api/readings")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test("should prevent another user from accessing a reading", async () => {
    const response = await request(app)
      .put(`/api/readings/${readingId}`)
      .set("Authorization", `Bearer ${secondUserToken}`)
      .send({ value: 125 });

    expect(response.statusCode).toBe(404);
  });

  test("should update a glucose reading", async () => {
    const response = await request(app)
      .put(`/api/readings/${readingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ value: 125 });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("should delete a glucose reading", async () => {
    const response = await request(app)
      .delete(`/api/readings/${readingId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
