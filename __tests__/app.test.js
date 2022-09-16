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
// describe("GET", () => {
//   describe("/api/categorgies", () => {
//     test("200: Retrieve categories data", () => {
//       return request(app)
//         .get("/api/categories")
//         .expect(200)
//         .then((res) => {
//           const body = res.body;
//           expect(typeof body).toBe("object");

//           const { categories } = body;
//           expect(Array.isArray(categories)).toBe(true);
//           expect(categories.length > 0).toBe(true);

//           categories.forEach((category) => {
//             expect(typeof category.slug).toBe("string");
//             expect(typeof category.description).toBe("string");
//           });
//         });
//     });
//   });

//   describe("GET", () => {
//     describe("/api/reviews/:reviews_id", () => {
//       test("200: Returns a review by id number", () => {
//         return request(app)
//           .get("/api/reviews/1")
//           .expect(200)
//           .then((res) => {
//             const review = res.body.review;

//             expect(review).toEqual(
//               expect.objectContaining({
//                 review_id: 1,
//                 title: "Agricola",
//                 review_body: "Farmyard fun!",
//                 designer: "Uwe Rosenberg",
//                 review_img_url:
//                   "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
//                 votes: 1,
//                 category: "euro game",
//                 owner: "mallionaire",
//                 created_at: "2021-01-18T10:00:20.514Z",
//               })
//             );
//           });
//       });
//       describe("/api/reviews/:reviews_id", () => {
//         test("400: Returns error for non-numerical ID input", () => {
//           return request(app)
//             .get("/api/reviews/invalidInput")
//             .expect(400)
//             .then(({ body }) => {
//               expect(body.msg).toBe("Invalid request input");
//             });
//         });
//       });
//       describe("/api/reviews/:reviews_id", () => {
//         test("404: Returns error when input does not exist", () => {
//           return request(app)
//             .get("/api/reviews/99999")
//             .expect(404)
//             .then(({ body }) => {
//               expect(body.msg).toBe("404: 99999 Not found");
//             });
//         });
//         describe("/api/reviews/:review_id(comment_count)", () => {
//           test("200: Retrieve comment count", () => {
//             return request(app)
//               .get("/api/reviews/2")
//               .expect(200)
//               .then((res) => {
//                 const review = res.body.review;
//                 expect(typeof review.comment_count).toBe("number");
//                 expect(review.comment_count).toBe(3);
//               });
//           });
//         });
//         describe("GET", () => {
//           describe("/api/users", () => {
//             test("200: Retrieve users data", () => {
//               return request(app)
//                 .get("/api/users")
//                 .expect(200)
//                 .then((res) => {
//                   const body = res.body;
//                   expect(typeof body).toBe("object");

//                   const { users } = body;
//                   expect(Array.isArray(users)).toBe(true);
//                   expect(users.length > 0).toBe(true);

//                   users.forEach((user) => {
//                     expect(typeof user.username).toBe("string");
//                     expect(typeof user.name).toBe("string");
//                     expect(typeof user.avatar_url).toBe("string");
//                   });
//                 });
//             });
//           });
//         });
//       });
//     });
//   });
// });

describe("PATCH", () => {
  describe("/api/reviews/:reviews_id", () => {
    test("201: Update 'votes' property in the review table according to the review_id provided by the user", () => {
      const voteChange = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/1")
        .send(voteChange)
        .expect(201)
        .then(({ body }) => {
          expect(typeof body.review).toBe("object");
          expect(body.review.votes).toBe(2);
        });
    });
    describe("/api/reviews/:reviews_id", () => {
      test("404: returns an error message when user tries to vote for a review_id that doesn't exist", () => {
        const voteChange = { inc_votes: 1 };
        return request(app)
          .patch("/api/reviews/99999")
          .send(voteChange)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("404: 99999 Not found");
          });
      });
    });

    ////////////////
    // function voteNumberValidator(numToChangeBy) {
    //   if (numToChangeBy != 1 || numToChangeBy != -1) {
    //     return new Error("Invalid request input");
    //   }
    //   return numToChangeBy;
    // } //the arg would be  inc_votes
    ////////////////////////////
    describe("/api/reviews/:reviews_id", () => {
      test("400: returns an error message when client provides invalid inc_vote value e.g non-numerical input", () => {
        const voteChange = { inc_votes: "invalidDataTypeID" };
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid request input");
          });
      });
    });
    describe("/api/reviews/:reviews_id", () => {
      test("201: vote value must be numerical value of 1 e.g {inc_votes:1}", () => {
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

    describe("/api/reviews/:reviews_id", () => {
      test("400: returns an error message when request object does not have a key of inc_votes", () => {
        const voteChange = { invalid_key: 1 };
        return request(app)
          .patch("/api/reviews/1")
          .send(voteChange)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid request input");
          });
      });
    });
  });
});

// describe("/api/reviews/:reviews_id", () => {
//   test("400: returns an error message when user supplies review_id that  is not a number", () => {
//     const voteChange = { inc_votes: 1 };
//     const reqReview_id = "pg_sleep";
//     return request(app)
//       .patch(`/api/reviews/${reqReview_id}`)
//       .send(voteChange)
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Invalid request input");
//       });
//   }); //i dont understand how this passes no matter what, then if i put my if statment back in the model, it still passes but then the test for 'review_id that does not exist e.g999' obvi gets a 400 instead of a 404- i can't get this set up to differ between numbers and string for the supplied review_id
// });

describe("/api/reviews/:reviews_id", () => {
  test("400: returns an error message when user supplies review_id that isn't a number", () => {
    const voteChange = { inc_votes: 1 };
    const reqReview_id = "pg_sleep";
    return request(app)
      .patch(`/api/reviews/${reqReview_id}`)
      .send(voteChange)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid request input");
      });
  });
}); //passing and shouldn't be

// describe("GET", () => {
//   describe("/api/reviews", () => {
//     test("200: Returns a array of review objects with the following properties", () => {
//       return request(app)
//         .get("/api/reviews")
//         .expect(200)
//         .then((res) => {
//           const reviews = res.body.reviews;

//           expect(reviews.length >= 1).toBe(true);
//           reviews.forEach((review) => {
//             expect(review).toEqual(
//               expect.objectContaining({
//                 review_id: expect.any(Number),
//                 title: expect.any(String),
//                 review_body: expect.any(String),
//                 designer: expect.any(String),
//                 review_img_url: expect.any(String),
//                 votes: expect.any(Number),
//                 category: expect.any(String),
//                 owner: expect.any(String),
//                 created_at: expect.any(String),
//                 comment_count: expect.any(Number),
//               })
//             );
//           });
//         });
//     });
//   });
// });

// describe("/api/reviews?category=dexterity", () => {
//   test("200: Returns a array of reviews filtered by catergory", () => {
//     return request(app)
//       .get("/api/reviews?category=social deduction")
//       .expect(200)
//       .then((res) => {
//         const reviews = res.body.reviews;

//         expect(reviews.length >= 1).toBe(true);
//         reviews.forEach((review) => {
//           expect(review.category).toBe("social deduction");
//         });
//       });
//   });
//   test("404: returns error if category does not exist", () => {
//     return request(app)
//       .get("/api/reviews?category=doesNotExist")
//       .expect(404)
//       .then(({ body }) => {
//         expect(body.msg).toBe("404: doesNotExist Not found");
//       });
//   });
// });
// // test("404: returns error if category exists but has not been reviewed", () => {
// //   return request(app)
// //     .get("/api/reviews?category=children's games")
// //     .expect(200)
// //     .then((res) => {
// //       const reviews = res.body.reviews;
// //       console.log(reviews);
// //       expect(reviews).toEqual([]);
// //     }); //this isn't correct as child games does exist it just hasn;t got a review
// //   //even the name of the test is wrong. we will get back an empty array, so not a standard 404 error.
// // });

// const helper2 = require("./helper.test.js");
// module.exports = helper;

// test("200: returns reviews in order of date descending", () => {
//   return request(app)
//     .get("/api/reviews")
//     .expect(200)
//     .then(({ body }) => {
//       console.log(body);
//       expect(body.reviews).toBeSortedBy("created_at", { descending: true });
//     });
// });
