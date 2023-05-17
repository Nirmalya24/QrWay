import IUsersModelAngular from "./IUsersModelAngular";
import IRestaurantModelAngular from "./IRestaurantModelAngular";

interface IRestaurantOwnerModelAngular extends IUsersModelAngular {
    restaurantList: [IRestaurantModelAngular];
}
export default IRestaurantOwnerModelAngular;