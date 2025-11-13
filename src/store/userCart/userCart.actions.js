import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./userCart.types";

export const setIsCartOpen = (bool) => createAction(
            CART_ACTION_TYPE.SET_IS_CART_OPEN,
            bool,
        )

export const addItemToCart = (userSelectedProducts, selectedProduct) => {
        let newUserSelectedProducts = [];
        const existingItem = userSelectedProducts.find(item => item.id == selectedProduct.id);
        if(existingItem){
            newUserSelectedProducts = userSelectedProducts.map(item => 
                item.id === selectedProduct.id 
                ? {...item, quantity : item.quantity + 1}
                : item
            )
        }
        else{
            // if product doesn't exist in setUserSelectedProducts list -> add it with additional property 'quantity'
            newUserSelectedProducts = [...userSelectedProducts, {...selectedProduct, quantity : 1}]
        }
        return createAction(CART_ACTION_TYPE.SET_ITEMS,newUserSelectedProducts);
    }
export const removeItemFromCart = (userSelectedProducts,selectedProduct) => {
        const filteredItems = userSelectedProducts.filter(product => product.id !== selectedProduct.id);
        return createAction(CART_ACTION_TYPE.SET_ITEMS,filteredItems);
    }

export const decreaseQuantityByOne = (userSelectedProducts, cartItemToRemove) => {
        const newUserSelectedProducts =
                userSelectedProducts
                    .map(item => item.id === cartItemToRemove.id && item.quantity > 0
                    ? {...item, quantity : item.quantity - 1}
                    : item
                    )
                    .filter(item => item.quantity !== 0);
        return createAction(CART_ACTION_TYPE.SET_ITEMS,newUserSelectedProducts);
    }
export const clearAllItems = () => createAction(CART_ACTION_TYPE.SET_ITEMS, [])