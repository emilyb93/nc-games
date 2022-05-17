const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("/api/categories", () => {
  describe("GET", () => {
    test("should respond with a status 200 and an array of category objects", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
      const categories = res.body.categories;
      expect(categories).toBeInstanceOf(Array);
      expect(categories).toHaveLength(4);
      categories.forEach((category) => {
        expect(category).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
    });
  });
});
