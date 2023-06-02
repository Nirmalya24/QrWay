var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);

describe("Test to get all menus", function () {
  const restaurantID = "b061d548-e85c-11ed-a05b-0242ac120003";
  let responseBody;
  let response;

  before(function (done) {
    chai
      .request("http://localhost:8000")
      .get(`/api/menus/${restaurantID}`)
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

  it("Returns value is an array", function (done) {
    expect(responseBody).to.be.an("array");
    done();
  });

  it("Return type of body is JSON", function (done) {
    expect(response).to.be.json;
    done();
  });

  it("Restaurants contains expected attribute names", function (done) {
    responseBody.forEach(function (restaurant) {
      expect(restaurant).to.have.all.keys(
        "_id",
        "menuID",
        "restaurantID",
        "menuName",
        "menuItems",
        "menuSections",
        "menuDescription",
        "menuStartTime",
        "menuEndTime",
        "public"
      );
    });
    done();
  });

  it("Item contains expected attribute types", function (done) {
    const expectedAttributeTypes = {
      "_id": "string",
      "menuID": "string",
      "restaurantID": "string",
      "menuName": "string",
      "menuItems": "array",
      "menuSections": "object",
      "menuDescription": "string",
      "menuStartTime": "string",
      "menuEndTime": "string",
      "public": "boolean"
    }
  
    responseBody.forEach(function (item) {
      Object.keys(expectedAttributeTypes).forEach(function (key) {
        const expectedType = expectedAttributeTypes[key];
        expect(item[key]).to.be.a(expectedType);
      });
    });
  
    done();
  });
  

  it("Item contains _id", function (done) {
    responseBody.forEach(function (item) {
      expect(item).to.have.property("_id");
    });
    done();
  });
  
  it("Item contains restaurantID", function (done) {
    responseBody.forEach(function (item) {
      expect(item).to.have.property("restaurantID");
    });
    done();
  });
  

});
