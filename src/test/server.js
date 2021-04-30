// Imports the server.js file to be tested.
let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
var assert = chai.assert;

describe("Server!", () => {
  // test if homepage works
  it("Returns the home page", (done) => {
    chai
      .request(server.server)
      .get("/")
      .end((err, response) => {
        expect(response).to.have.status(200);
        assert.equal(
          response.header["content-type"],
          "text/html; charset=utf-8"
        );
        done();
      });
  });

  // test if reviews page works
  it("Displays reviews page", (done) => {
    chai
      .request(server.server)
      .get("/reviews")
      .end((err, response) => {
        expect(response).to.have.status(200);
        assert.equal(
          response.header["content-type"],
          "text/html; charset=utf-8"
        );
        done();
      });
  });

  // test if POST request works
  it("Sends POST request to /addReview", (done) => {
    chai
      .request(server.server)
      .post("/addReview")
      .send({
        timeDate: "testDate",
        movieTitle: "testTitle",
        movieReview: "testDate",
      })
      .end((err, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});
