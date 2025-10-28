import { 
    createContext,
    useReducer,
} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserCartContext = createContext({
    userSelectedProducts : [],
    totalPrice : 0,
    totalItems : 0,
    isCartOpen : false,
    setIsCartOpen : () => {},
    addItemToCart : (selectedProduct) => {},
    removeItemFromCart : (selectedProduct) => {},
    decreaseQuantityByOne : (selectedProduct) => {},
    clearAllItems : () => {},
})

const CART_ACTION_TYPE = {
    SET_ITEMS : "SET_ITEMS",
    SET_IS_CART_OPEN : "SET_IS_CART_OPEN",
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPE.SET_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen : payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in useReducer`)
    }
};
const INITIAL_STATE = {
    userSelectedProducts : [],
    totalPrice : 0,
    totalItems : 0,
    isCartOpen : false,
}
export const UserCartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const {
        userSelectedProducts, 
        totalItems, 
        totalPrice,
        isCartOpen
    } = state;
    const updateCartItemReducer = (newUserSelectedProducts) => {
        // count total number of items
        const countItems = newUserSelectedProducts.reduce((total, item)=> total + item.quantity, 0);
        // calculate the total price of items
        const calculateTotalPrice = newUserSelectedProducts.reduce((total, item)=> total + (item.price * item.quantity), 0);

        dispatch(createAction(
                CART_ACTION_TYPE.SET_ITEMS, 
                {
                userSelectedProducts : newUserSelectedProducts,
                totalPrice : calculateTotalPrice,
                totalItems: countItems,
                }
            ))
    }
    const setIsCartOpen = (bool) => {
        dispatch(createAction(
            CART_ACTION_TYPE.SET_IS_CART_OPEN,
            bool,
        ))
    }

    const addItemToCart = (selectedProduct) => {
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
        updateCartItemReducer(newUserSelectedProducts);
    }
    const removeItemFromCart = (selectedProduct) => {
        const filteredItems = userSelectedProducts.filter(product => product.id !== selectedProduct.id);
        updateCartItemReducer(filteredItems);
    }

    const decreaseQuantityByOne = (cartItemToRemove) => {
        const newUserSelectedProducts =
                userSelectedProducts
                    .map(item => item.id === cartItemToRemove.id && item.quantity > 0
                    ? {...item, quantity : item.quantity - 1}
                    : item
                    )
                    .filter(item => item.quantity !== 0);
        updateCartItemReducer(newUserSelectedProducts);
    }
    const clearAllItems = () => updateCartItemReducer([])
    

    const value = {
        userSelectedProducts, 
        totalItems, 
        isCartOpen,
        totalPrice,
        addItemToCart, 
        removeItemFromCart, 
        decreaseQuantityByOne,
        setIsCartOpen,
        clearAllItems,
    }
    return (
        <UserCartContext.Provider value={value}>
            {children}
        </UserCartContext.Provider>
    )
}

