const db = require("../data/config");
const chickensModel = require("./chickens-model");

beforeEach(async () => {
  await db.seed.run();
});

describe("chickens model", () => {
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
});
