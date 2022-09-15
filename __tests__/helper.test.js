// const helper = require("./app.test.js");
// module.exports = helper2;

// // beforeEach(() => {
// //   return seed(testData);
// // });

// // afterAll(() => {
// //   return db.end();
// // });
// describe("function voteNumberValidator(numToChangeBy)", () => {
//   describe("returns an error if inc_votes !=1", () => {
//     test("returns 400 error if inc_votes does not = 1", () => {
//       const voteChange = { inc_votes: 1 };
//       voteNumberValidator(inc_votes);
//       return request(app)
//         .patch("/api/reviews/1")
//         .send(voteChange)
//         .expect(201)
//         .then(({ body }) => {
//           expect(voteNumberValidator(inc_votes)).toBe(
//             "Invalid request input"
//           );
//         });
//     });
//   });
// });
