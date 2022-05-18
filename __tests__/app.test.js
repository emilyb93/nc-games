const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const req = require("express/lib/request");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("/api/categories", () => {
  describe("GET", () => {
    test("should respond with a status 200 and an array of category objects", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
      const { categories } = res.body;
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

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    test("respond with a 200 and an object with the review information", async () => {
      const res = await request(app).get("/api/reviews/2");

      expect(res.status).toBe(200);
      const { review } = res.body;

      expect(review).toMatchObject({
        review_id: 2,
        title: expect.any(String),
        review_body: expect.any(String),
        designer: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: expect.any(String),
        owner: expect.any(String),
        created_at: expect.any(String),
      });
    });

    test("should respond with 404 if a valid number is out of range for the articles in the database", async () => {
      const res = await request(app).get("/api/reviews/9001");

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Not Found");
    });
  });

  test("should respond with a 400 if the review id is not an integer", async () => {
    const res = await request(app).get("/api/reviews/not_an_int");

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Bad Request");
  });
});

describe("Error Handling - Misc", () => {
  describe("/api/not_an_endpoint", () => {
    describe("GET", () => {
      test("should respond with a 404 and a message of Not Found", async () => {
        const res = await request(app).get("/api/not_an_endpoint");

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Not Found");
      });
    });
  });
});
