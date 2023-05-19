interface IMenuModelAngular {
    menuID: string;
    restaurantID: string;
    menuName: string;
    menuItems: [string];
    menuSections: object;
    menuDescription: string;
    menuStartTime: string;
    menuEndTime: string;
    public:boolean;
}
export default IMenuModelAngular;