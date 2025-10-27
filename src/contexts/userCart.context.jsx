import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const UserCartContext = createContext({
    userSelectedProducts : [],
    totalPrice : 0,
    totalItems : 0,
    isCartOpen : false,
    setIsCartOpen : () => {},
    addItemToCart : (selectedProduct) => {},
    removeItemFromCart : (selectedProduct) => {},
    increaseQuantityByOne : (selectedProduct) => {},
    decreaseQuantityByOne : (selectedProduct) => {},
    clearAllItems : () => {},
})

export const UserCartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userSelectedProducts, setUserSelectedProducts] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // count total number of items whenever userSelectedProducts changes
    useEffect(()=>{
        const countItems = userSelectedProducts.reduce((total, item)=> total + item.quantity, 0);
        setTotalItems(countItems);
    },[userSelectedProducts])

    // calculate the total price of items whenever userSelectedProducts changes
    useEffect(()=>{
        const calculateTotalPrice = userSelectedProducts.reduce((total, item)=> total + (item.price * item.quantity), 0);
        setTotalPrice(calculateTotalPrice);
    },[userSelectedProducts])

    const addItemToCart = (selectedProduct) => {
        setUserSelectedProducts(prevSelectedproducts => {
        const existingItem = prevSelectedproducts.find(item => item.id == selectedProduct.id);
        // product already exist -> increase quantity
        if(existingItem){
            return prevSelectedproducts.map(item => 
                item.id === selectedProduct.id
                ? {...item, quantity : item.quantity + 1}
            : item
            )
        }
        // if product doesn't exist in setUserSelectedProducts list -> add it with additional property 'quantity'
        return [...prevSelectedproducts, {...selectedProduct, quantity : 1 }]
        })
    }
    const removeItemFromCart = (selectedProduct) => {
        const filteredItems = userSelectedProducts.filter(product => product.id !== selectedProduct.id);
        setUserSelectedProducts(filteredItems);
    }

    const decreaseQuantityByOne = (cartItemToRemove) => {
        setUserSelectedProducts(prevSelectedproducts => 
            prevSelectedproducts
                .map(item => item.id === cartItemToRemove.id && item.quantity > 0
                ? {...item, quantity : item.quantity - 1}
                : item
                )
                .filter(item => item.quantity !== 0)
        )
    }
    const clearAllItems = () => setUserSelectedProducts([])
    

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

