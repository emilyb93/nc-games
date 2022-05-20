const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const req = require("express/lib/request");

beforeEach(() => seed(testData));

afterAll(() => db.end());

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
      const res = await request(app).get("/api/reviews/1");

      expect(res.status).toBe(200);
      const { review } = res.body;

      expect(review).toMatchObject({
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: "2021-01-18T10:00:20.514Z",
        votes: 1,
      });
    });

    describe("errors", () => {
      test("should respond with 404 if a valid number is out of range for the articles in the database", async () => {
        const res = await request(app).get("/api/reviews/9001");

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Not Found");
      });

      test("should respond with a 400 if the review id is not an integer", async () => {
        const res = await request(app).get("/api/reviews/not_an_int");

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });
    });
  });

  describe("PATCH", () => {
    test("should respond with the updated review", async () => {
      const voteObj = { inc_votes: 20 };
      const res = await request(app).patch("/api/reviews/2").send(voteObj);

      expect(res.status).toBe(200);
      expect(res.body.review).toMatchObject({
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 25,
      });
    });

    test("should work with negative values", async () => {
      const voteObj = { inc_votes: -4 };
      const res = await request(app).patch("/api/reviews/2").send(voteObj);

      expect(res.status).toBe(200);
      expect(res.body.review).toMatchObject({
        title: "Jenga",
        designer: "Leslie Scott",
        owner: "philippaclaire9",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        review_body: "Fiddly fun for all the family",
        category: "dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 1,
      });
    });

    describe("errors", () => {
      test("should respond with 404 if passed an out of range review id", async () => {
        const voteObj = { inc_votes: 20 };
        const res = await request(app).patch("/api/reviews/9001").send(voteObj);

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Review Not Found");
      });

      test("should respond with 400 if the review_id is the incorrect data type", async () => {
        const voteObj = { inc_votes: 20 };
        const res = await request(app).patch("/api/reviews/one").send(voteObj);

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });

      test("should respond with 400 if the inc_votes is broken/missing", async () => {
        const voteObj = { votes: 20 };
        const res = await request(app).patch("/api/reviews/1").send(voteObj);

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });

      test("should respond with 400 if the inc_votes property is the wrong data type", async () => {
        const voteObj = { inc_votes: "twenty" };
        const res = await request(app).patch("/api/reviews/1").send(voteObj);

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });
    });
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
