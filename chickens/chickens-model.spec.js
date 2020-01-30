const db = require("../data/config");
const chickensModel = require("./chickens-model");

beforeEach(async () => {
  await db.seed.run();
});

describe("chickens model", () => {
  test("get", async () => {
    const res = await chickensModel.get();
    expect(res).toHaveLength(5);
  });

  test("getById", async () => {
    const res = await chickensModel.getById(1);
    expect(res.name).toMatch(/carol/i);
  });

  test("create", async () => {
    await chickensModel.create({ name: "janelle", breed: "salmon faverolle" });
    const chickens = await db("chickens");
    expect(chickens).toHaveLength(6);
  });

  test("delete", async () => {
    await chickensModel.del(1);
    const chickens = await db("chickens");
    expect(chickens).toHaveLength(4);
  });

  test("update", async () => {
    const res = await chickensModel.update(1, {
      name: "janelle",
      breed: "salmon faverolle"
    });
    expect(res.name).toMatch(/janelle/i);

    const chickens = await db("chickens");
    expect(chickens).toHaveLength(5);
  });
});
