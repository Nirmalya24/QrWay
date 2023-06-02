var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var host ="http://localhost:8080";

chai.use(chaiHttp);
const restaurantID = "b061d548-e85c-11ed-a05b-0242ac120003";
  let responseBody;
  let response;

describe("Test to post ONE restaurants ", function () {
  
  let restaurant={ 
  "restaurantName" :"Test8",    
  "managerID":["tes1,test2"],
  "restaurantOwnerID":"d792c6be-e89c-11ed-a05b-0242ac120003",
  "description":"Test description",
  "restaurantImage":"https://restaurantclicks.com/wp-content/uploads/2022/06/breakfast-seat…",
  "tag":"Breakfast",
  "menusID":["123","222"]

  }

  before(function (done) {
    chai
      .request(host)
      .post(`/api/restaurant/`,)
      .set('content-type', 'application/json')
      .send(
        restaurant
      )
      .then(function (res) {
        response = res;
        responseBody = res.body;
        done();
      });
  });
  after(function (done) {
    chai
      .request(host)
      .delete(`/api/restaurant/delete/${responseBody.restaurantID}`)
      .then(function (res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("POST - Creates a new restaurant", function (done) {
    expect(response.statusCode).to.equal(200);
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
      "managerID": "array",
      "menusID": "array",
      "_id": "string",
      "restaurantName": "string",
      "restaurantID": "string",
      "restaurantOwnerID": "string",
      "description": "string",
      "restaurantImage": "string",
      "tag": "string"
    };
  
    Object.keys(expectedAttributeTypes).forEach(key => {
      const expectedType = expectedAttributeTypes[key];
      expect(responseBody[key]).to.be.a(expectedType);
    });
  
    expect(responseBody).to.have.property("_id");
    expect(responseBody).to.have.property("restaurantID");
  
    done();
  });
 

});

describe("Test state after delete", function () {
    let getResponse;

    before(function (done) {
      chai
        .request(host)
        .get(`/api/restaurant/${responseBody.restaurantID}`)
        .then(function (res) {
          getResponse = res;
          done();
        });
    });
    it("GET - Response body is empty", function () {
        console.log("getResponse.body"+getResponse.body)
      expect(getResponse.body).to.deep.equal(null);

    });
    // Additional test cases for the state after delete
    });

