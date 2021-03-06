const supertest = require("supertest");
const server = require("./index");
const db = require("./data/config");

beforeEach(async () => {
  await db.seed.run();
});

test("GET / - welcome route", async () => {
  const res = await supertest(server).get("/");

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/enjoy my chickens api/i);
});

test("GET /chickens - get chickens list", async () => {
  const res = await supertest(server).get("/chickens");

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].id).toBe(1);
  expect(res.body[0].name).toMatch(/carol/i);
});

test("GET /chicken/1 - get chicken by id", async () => {
  const res = await supertest(server).get("/chickens/1");

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.id).toBe(1);
  expect(res.body.name).toMatch(/carol/i);
});

test("POST /chickens - create new chicken route", async () => {
  const res = await supertest(server)
    .post("/chickens")
    .send({
      name: "janelle",
      breed: "salmon faverolle"
    });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body).toEqual({
    id: 6,
    name: "janelle",
    breed: "salmon faverolle"
  });
});

test("PUT /chickens/1 - update chicken route", async () => {
  const res = await supertest(server)
    .put("/chickens/1")
    .send({
      name: "janelle",
      breed: "salmon faverolle"
    });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body).toEqual({
    id: 1,
    name: "janelle",
    breed: "salmon faverolle"
  });
});

test("DELETE /chickens - delete chicken route", async () => {
  const res = await supertest(server).delete("/chickens/1");

  // does it return the expected status code?
  expect(res.status).toBe(204);

  // does it return the expected data format?
  expect(res.type).toBe("");
});
