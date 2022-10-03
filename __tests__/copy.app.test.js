const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");
const voteNumberValidator = require("../controllers/reviews");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("PATCH", () => {
  describe("/api/reviews/:reviews_id", () => {
    test("201: Update 'votes' property in the review table according to the review_id provided by the user", () => {
      const voteChange = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/1")
        .send(voteChange)
        .expect(201)
        .then(({ body: { review } }) => {
          expect(typeof review).toBe("object");
          expect(review.votes).toBe(2);
        });
    });
    /////////expected 404 "Not Found", got 400 "Bad Request"
    describe("/api/reviews/:reviews_id", () => {
      test("404: returns an error message when user tries to vote for a review_id that doesn't exist", () => {
        const voteChange = { inc_votes: 1 };
        return request(app)
          .patch("/api/reviews/99999")
          .send(voteChange)
          .expect(404)
          .then(({ body }) => {
            console.log(1111111, body.msg);
            expect(body.msg).toBe("404: 99999 Not found");
          });
      });
    });
    //this one passes even when it is given a number.
    describe("/api/reviews/:reviews_id", () => {
      test("400: returns an error message when user supplies review_id that isn't a number", () => {
        const voteChange = { inc_votes: 1 };
        return request(app)
          .patch(`/api/reviews/stringOfOne`)
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("400: Invalid request input");
          });
      });
    });
    //
    //
    ////////////////votes
    describe("/api/reviews/:reviews_id", () => {
      test("400: returns an error message when request object does not have a key of inc_votes", () => {
        const voteChange = { invalid_key: 1 };
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("400: Invalid request input");
          });
      });
    });

    describe("/api/reviews/:reviews_id", () => {
      test("400: returns an error message when client provides invalid inc_vote value e.g non-numerical input", () => {
        const voteChange = { inc_votes: "invalidDataTypeID" };
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("400: Invalid request input");
          });
      });
    });

    //this one test the 201 status ensuring that the votes === 1
    //but because we havent defined an error, it seems to be grabbing it's own
    //which is 400 bad request instead of 400 invalid request input
    //i'm sure that it is this that is causing the problems with the 'notorious 3'
    describe("/api/reviews/:reviews_id", () => {
      test("201: value of a vote must be numerical value of 1 e.g {inc_votes:1}", () => {
        const voteChange = { inc_votes: 1 };
        // voteNumberValidator(2);
        const testReview = {
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 1,
        };
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(201)
          .then((res) => {
            const body = res.body;
            const { review } = body;
            expect(typeof voteChange.inc_votes).toBe("number");
            expect(review.votes).toBe(testReview.votes + voteChange.inc_votes);
            expect(review.votes).toBe(testReview.votes + 1);
          });
      });
    });
    //error handling for votes exceeding 1
    describe("/api/reviews/:reviews_id", () => {
      test("400: throws error when inc_votes value exceeds 1 or is less than -1", () => {
        const voteChange = { inc_votes: 2 };
        //
        //voteNumberValidator(voteChange);
        //
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            // expect(voteNumberValidator(inc_votes)).toBe(
            //   "Invalid request input"
            // );
            expect(body.msg).toBe("400: Invalid request input");
          });
        //this is the spare one that doesn't use the helper function and would have depended on oneoff/not reusable if statments.
        // describe("/api/reviews/:reviews_id", () => {
        //   test("400: throws error when inc_votes value exceeds 1", () => {
        //     const voteChange = { inc_votes: 2 };
        //     return request(app)
        //       .patch("/api/reviews/1")
        //       .send(voteChange)
        //       .expect(400)
        //       .then(({ body }) => {
        //         expect(body.msg).toBe("Invalid request input");
        //       }); //still need to adapt the model to acheive this
      });
    });
  });
});
