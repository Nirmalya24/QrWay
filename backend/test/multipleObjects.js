var chai = require("chai");
var chaiHttp = require("chai-http");
var async = require("async");

var expect = chai.expect;
var should = chai.should();

var http = require("http");
chai.use(chaiHttp);

describe("Test to get a LIST of restaurants", function () {
  this.timeout(15000);

  var requestResult;
  var response;

  before(function (done) {
    chai
      .request("http://127.0.0.1:8000")
      .get("/api/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003")
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        expect(err).to.be.null;
        done();
      });
  });

  it("Return status is 200", function (done) {
    expect(response).to.have.status(200);
    done();
  });

  it("Response body is of type array", function (done) {
    expect(response.body).to.be.an("array");
    done();
  });

  it("Each restaurant in array has expected attribute type", function (done) {
    response.body.forEach((restaurant) => {
      expect(restaurant).to.have.property("managerID").that.is.a("array");
      expect(restaurant).to.have.property("menusID").that.is.a("array");
      expect(restaurant).to.have.property("restaurantName").that.is.a("string");
      expect(restaurant).to.have.property("restaurantID").that.is.a("string");
      expect(restaurant)
        .to.have.property("restaurantOwnerID")
        .that.is.a("string");
      expect(restaurant).to.have.property("description").that.is.a("string");
      expect(restaurant)
        .to.have.property("restaurantImage")
        .that.is.a("string");
      expect(restaurant).to.have.property("tag").that.is.a("string");
    });
    done();
  });

  it("Each restaurant in array has expected attribute name", function (done) {
    response.body.forEach((restaurant) => {
      expect(restaurant).to.have.all.keys(
        "managerID",
        "menusID",
        "_id",
        "restaurantName",
        "restaurantID",
        "restaurantOwnerID",
        "description",
        "restaurantImage",
        "tag"
      );
    });
    done();
  });

  it("Each restaurant in array has a MongoDB ID", function (done) {
    response.body.forEach((restaurant) => {
      expect(restaurant).to.have.property("_id");
    });
    done();
  });

  it("Each restaurant in array has a Restaurant ID", function (done) {
    response.body.forEach((restaurant) => {
      expect(restaurant).to.have.property("restaurantID");
    });

    done();
  });
});
