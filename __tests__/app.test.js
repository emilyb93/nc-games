const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

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
    test("should respond with a review object containing a comment_count as an int", async () => {
      const res = await request(app).get("/api/reviews/2");

      const { review } = res.body;
      expect(res.status).toBe(200);

      expect(review).toHaveProperty("comment_count");
      expect(review.comment_count).toBe(3);
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

      test("should respond with 400 if the key is incorrect", async () => {
        const voteObj = { votes: 20 };
        const res = await request(app).patch("/api/reviews/1").send(voteObj);

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });

      test("should respond with 400 if sent an empty object", async () => {
        const voteObj = {};
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

  describe("/api/users", () => {
    test("should respond with 200 and an array of users", async () => {
      const res = await request(app).get("/api/users");

      const { users } = res.body;
      expect(res.status).toBe(200);
      expect(users).toBeInstanceOf(Array);

      expect(users).toHaveLength(4);

      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET", () => {
    test("should respond with an array of all the reviews with the relevant keys", async () => {
      const res = await request(app).get("/api/reviews");
      const { reviews } = res.body;
      expect(res.status).toBe(200);

      expect(reviews).toBeInstanceOf(Array);
      expect(reviews).toHaveLength(13);

      reviews.forEach((review) => {
        expect(review).toMatchObject(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });

    test("should respond with an array of reviews sorted by created_at in descending order", async () => {
      const res = await request(app).get("/api/reviews");
      const { reviews } = res.body;
      expect(res.status).toBe(200);

      expect(reviews).toBeSortedBy("created_at", { descending: true });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    test("should respond with an array of comments for that specific review_id only ", async () => {
      const res = await request(app).get("/api/reviews/2/comments");
      const { comments } = res.body;

      expect(res.status).toBe(200);
      expect(comments).toBeInstanceOf(Array);
      expect(comments).toHaveLength(3);

      comments.forEach((comment) => {
        expect(comment).toMatchObject(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            review_id: 2,
          })
        );
      });
    });

    test("should respond with an empty array if the article exists but has no comments", async () => {
      const res = await request(app).get("/api/reviews/1/comments");
      const { comments } = res.body;

      expect(res.status).toBe(200);
      expect(comments).toBeInstanceOf(Array);
      expect(comments).toHaveLength(0);
    });

    describe("errors", () => {
      test("should return 404 if the article does not exist", async () => {
        const res = await request(app).get("/api/reviews/9001/comments");

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Not Found");
      });

      test("should return 400 if the article id is not an int", async () => {
        const res = await request(app).get("/api/reviews/not_an_int/comments");

        expect(res.status).toBe(400);
        expect(res.body.msg).toBe("Bad Request");
      });
    });
  });

  describe("POST", () => {
    test("should respond with 201 and an object of the posted comment with the new keys added", async () => {
      const newComment = {
        username: "mallionaire",
        body: "jiminy jillickers batman",
      };

      const res = await request(app)
        .post("/api/reviews/2/comments")
        .send(newComment);

      const { comment } = res.body;
      console.log(res.body);

      expect(res.status).toBe(201);

      expect(comment).toMatchObject(
        expect.objectContaining({
          author: "mallionaire",
          body: "jiminy jillickers batman",
          review_id: 2,
          votes: 0,
          created_at: expect.any(String),
          comment_id: 7,
        })
      );
    });
    describe("errors", () => {
      test("should respond with 404 if review_id doesnt exist", async () => {
        const newComment = {
          username: "mallionaire",
          body: "jiminy jillickers batman",
        };

        const res = await request(app)
          .post("/api/reviews/9001/comments")
          .send(newComment);

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("Not Found");
      });

      test("should respond with 400 if review_id is not an int", async () => {
        const newComment = {
          username: "mallionaire",
          body: "jiminy jillickers batman",
        };

        const res = await request(app)
          .post("/api/reviews/not_an_int/comments")
          .send(newComment);

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
