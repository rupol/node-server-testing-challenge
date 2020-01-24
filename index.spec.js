const supertest = require("supertest");
const server = require("./index");
const db = require("./data/config");

beforeEach(async () => {
  await db.seed.run();
});

test("welcome route", async () => {
  const res = await supertest(server).get("/");

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/enjoy my chickens api/i);
});
