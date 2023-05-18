import IUsersModelAngular from "./IUsersModelAngular";

interface IRestaurantManagerModelAngular extends IUsersModelAngular {
    managerName: string;
    restaurantOwnerID: string;
    restaurantID: [string];
    userID:string;

}
export default IRestaurantManagerModelAngular;