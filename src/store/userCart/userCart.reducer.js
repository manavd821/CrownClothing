import { CART_ACTION_TYPE } from "./userCart.types"

const INITIAL_STATE = {
    userSelectedProducts : [],
    isCartOpen : false,
}
export const userCartReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPE.SET_ITEMS:
            return {
                ...state,
                userSelectedProducts : payload,
            };
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen : payload,
            };
        default:
            return state;
    }
}