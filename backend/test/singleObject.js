var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);

describe("Test to get ONE restaurants", function () {
  const restaurantID = "b061d548-e85c-11ed-a05b-0242ac120003";
  let responseBody;
  let response;

  before(function (done) {
    chai
      .request("http://localhost:3000")
      .get(`/api/restaurant/${restaurantID}`)
      .then(function (res) {
        response = res;
        responseBody = res.body;
        done();
      });
  });

  it("Return Status is 200 OK", function (done) {
    expect(response.statusCode).to.equal(200);
    done();
  });

  it("Returns value is an object", function (done) {
    expect(responseBody).to.be.an("object");
    done();
  });

  it("Return type of body is JSON", function (done) {
    expect(response).to.be.json;
    done();
  });

  it("Restaurant contains expected attribute names", function (done) {
    expect(responseBody).to.have.all.keys(
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
    done();
  });

  it("Restaurant contains expected attribute types", function (done) {
    const expectedAttributeTypes = {
      "managerID": "array",
      "menusID": "array",
      "_id": "string",
      "restaurantName": "string",
      "restaurantID": "string",
      "restaurantOwnerID": "string",
      "description": "string",
      "restaurantImage": "string",
      "tag": "string"
    }

    Object.keys(expectedAttributeTypes).forEach(key => {
      const expectedType = expectedAttributeTypes[key];
      expect(responseBody[key]).that.is.a(expectedType);
    });

    done();
  });

  it("Restaurant contains _id", function (done) {
    expect(responseBody).to.have.property("_id");
    done();
  });

  it("Restaurant contains restaurantID", function (done) {
    expect(responseBody).to.have.property("restaurantID");
    done();
  });

});
