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

          categories.forEach((category) => {
            expect(typeof category.slug).toBe("string");
            expect(typeof category.description).toBe("string");
          });
        });
    });
  });
});
