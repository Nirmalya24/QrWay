require("dotenv").config();
var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
const apiURL = "https://qrway.azurewebsites.net";

chai.use(chaiHttp);

describe("[GET] Test to get ONE item", function () {
  const itemID = "1a0eae26-33f9-4f9a-9c98-0a49a26a4181";
  let responseBody;
  let response;

  before(function (done) {
    chai
      .request(apiURL)
      .get(`/api/item/${itemID}`)
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

  it("Items contains expected attribute names", function (done) {
    expect(responseBody).to.have.all.keys(
      "_id",
      "itemName",
      "itemDescription",
      "itemPrice",
      "itemImg",
      "itemID",
      "restaurantsID",
      "menusID"
    );
    done();
  });

  it("Item contains expected attribute types", function (done) {
    const expectedAttributeTypes = {
      "_id": "string",
      "itemName": "string",
      "itemDescription": "string",
      "itemPrice": "number",
      "itemImg": "string",
      "itemID": "string",
      "restaurantsID": "array",
      "menusID": "array"
    }

    Object.keys(expectedAttributeTypes).forEach(key => {
      const expectedType = expectedAttributeTypes[key];
      expect(responseBody[key]).that.is.a(expectedType);
    });

    done();
  });

  it("Item contains _id", function (done) {
    expect(responseBody).to.have.property("_id");
    done();
  });

  it("Item contains itemID", function (done) {
    expect(responseBody).to.have.property("itemID");
    done();
  });

});
