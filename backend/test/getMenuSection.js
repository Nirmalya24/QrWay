require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const apiURL = "https://qrway.azurewebsites.net";

chai.use(chaiHttp);

describe("[GET] Test to get Menu Sections", function () {
  const menuID = "b061e16e-e85c-11ed-a05b-0242ac120003";
  const restaurantID = "b061d732-e85c-11ed-a05b-0242ac120003";
  let responseBody;
  let response;

  before(function (done) {
    chai
      .request(apiURL)
      .get(`/api/menus/${restaurantID}/${menuID}`)
      .then(function (res) {
        response = res;
        responseBody = res.body;
        done();
      });
  });

  it("Return Status is 200 OK", function () {
    expect(response.statusCode).to.equal(200);
  });

  it("Returns value is an object", function () {
    expect(responseBody).to.be.an("object");
  });


  it("Return type of body is JSON", function () {
    const contentType = response.headers['content-type'];
    //console.log("Content-Type:", contentType);
    expect(contentType).to.match(/application\/json/);
  });
  
  
  it("Menu contains expected attribute names", function () {
    const expectedAttributeNames = [
      "Desserts",
      "Mains",
      "Sides"
    ];
    expect(responseBody.menuSections).to.have.all.keys(...expectedAttributeNames);
  });

  it("Menu contains expected attribute types", function () {
    const expectedAttributeTypes = {
      "Desserts": "array",
      "Mains": "array",
      "Sides": "array"
    };

    Object.keys(expectedAttributeTypes).forEach(key => {
      const expectedType = expectedAttributeTypes[key];
      expect(responseBody.menuSections[key]).to.be.a(expectedType);
    });
  });

  it("MenuItem contains _id", function () {
    const menuItems = responseBody.menuSections.menuItems || [];
    menuItems.forEach(function (item) {
      expect(item).to.have.property("_id");
    });
  });
  
  it("Menu body contains restaurantID and itemID", function () {
    const menuItems = responseBody.menuSections.menuItems || [];
    menuItems.forEach(function (item) {
      expect(item).to.have.property("restaurantID");
      expect(item).to.have.property("itemID");
    });
  });
});
