interface IItemModelAngular {
    itemName: string;
    itemDecription: string;
    itemPrice: number,
    itemImg: string;
    itemID: string,
    restaurantsID: string[],// delete from db if empty 
    menusID: string[]
}
export default IItemModelAngular;