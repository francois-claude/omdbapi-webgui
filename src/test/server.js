// Imports the server.js file to be tested.
let server = require("../server");
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
var assert = chai.assert;

describe("Server!", () => {
  // test if homepage works
  it("Returns the home page", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.equal(res.header["content-type"], "text/html; charset=utf-8");
        done();
      });
  });

  // test if reviews page works
  it("Displays reviews page", (done) => {
    chai
      .request(server)
      .get("/reviews")
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.equal(res.header["content-type"], "text/html; charset=utf-8");
        done();
      });
  });
});
