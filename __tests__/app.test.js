const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});
describe("GET", () => {
  describe("/api/categorgies", () => {
    test("200: Retrieve Data", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((res) => {
          const body = res.body;
          expect(typeof body).toBe("object");

          const { categories } = body;
          expect(Array.isArray(categories)).toBe(true);
          expect(categories.length > 0).toBe(true);

          categories.forEach((category) => {
            expect(typeof category.slug).toBe("string");
            expect(typeof category.description).toBe("string");
          });
        });
    });
  });
});
describe("/api/reviews/:reviews_id", () => {
  test("200: Returns a review by id number", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((res) => {
        const review = res.body.review;

        expect(review[0]).toEqual(
          expect.objectContaining({
            review_id: 1,
            title: "Agricola",
            review_body: "Farmyard fun!",
            designer: "Uwe Rosenberg",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 1,
            category: "euro game",
            owner: "mallionaire",
            created_at: "2021-01-18T10:00:20.514Z",
          })
        );
      });
  });
  describe("/api/reviews/:reviews_id", () => {
    test("400: Returns error for non-numerical ID input", () => {
      return request(app)
        .get("/api/reviews/invalidInput")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid request input");
        });
    });
  });
  describe("/api/reviews/:reviews_id", () => {
    test("404: Returns error when input does not exist", () => {
      return request(app)
        .get("/api/reviews/99999")
        .expect(404)
        .then(({ body }) => {
          console.log(body);
          expect(body.msg).toBe("99999 Not found");
        });
    });
  });
});
