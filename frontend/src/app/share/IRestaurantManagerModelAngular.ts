import IUsersModelAngular from "./IUsersModelAngular";

interface IRestaurantManagerModelAngular extends IUsersModelAngular {
    managerName: string;
    restaurantOwnerID: string;
    restuarantID: string;
}
export default IRestaurantManagerModelAngular;