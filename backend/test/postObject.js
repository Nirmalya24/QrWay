var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
const port = process.env.PORT || 8080;
const host = `http://localhost:${port}`;


chai.use(chaiHttp);

let responseBody;
let response;

describe("[POST] Testing post endpoint ", function () {
  let restaurant = {
    restaurantName: "Test8",
    managerID: ["tes1,test2"],
    restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
    description: "Test description",
    restaurantImage:
      "https://restaurantclicks.com/wp-content/uploads/2022/06/breakfast-seat…",
    tag: "Breakfast",
    menusID: ["123", "222"],
  };

  it("Creates a new restaurant", function (done) {

    chai
      .request(host)
      .post(`/api/restaurant/`)
      .set("content-type", "application/json")
      .send(restaurant)
      .then(function (res) {
        const response = res;
        responseBody = res.body;

        expect(response.status).to.equal(200);
        expect(responseBody).to.be.an("object");
        expect(response).to.be.json;

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
        const expectedAttributeTypes = {
          managerID: "array",
          menusID: "array",
          _id: "string",
          restaurantName: "string",
          restaurantID: "string",
          restaurantOwnerID: "string",
          description: "string",
          restaurantImage: "string",
          tag: "string",
        };

        Object.keys(expectedAttributeTypes).forEach((key) => {
          const expectedType = expectedAttributeTypes[key];
          expect(responseBody[key]).to.be.a(expectedType);
        });

        expect(responseBody).to.have.property("_id");
        expect(responseBody).to.have.property("restaurantID");

        done();
      }).catch((err) => {
        // console.log(err);
        done(err)
      });
  });

  it("Delete the restaurant", function (done) {
    chai
      .request(host)
      .delete(`/api/restaurant/${responseBody.restaurantID}`)
      .then(function (res) {
        expect(res.body.deletedCount).to.be.equal(1);
        done();
      })
      .catch(function(err) {
        done(err);
      });

  });

  it("Checked if restaurant was deleted", function (done) {
    chai
      .request(host)
      .get(`/api/restaurant/${responseBody.restaurantID}`)
      .then(function (res) {
        expect(res.body).to.be.null;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
  
});

