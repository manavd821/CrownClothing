import { createSelector } from "reselect";

export const selectUserCartReducer = state => state.userCart

export const selectUserSelectedProducts = createSelector(
    [selectUserCartReducer],
    userCartSlice => userCartSlice.userSelectedProducts 
)
export const selectIsCartOpen = createSelector(
    [selectUserCartReducer],
    userCartSlice => userCartSlice.isCartOpen
)
export const selectTotalItems = createSelector(
    [selectUserSelectedProducts],
    products => products.reduce((total, item) => total + item.quantity, 0)
)
export const selectTotalPrice  =createSelector(
    [selectUserSelectedProducts],
    products => products.reduce((total, item) => total + (item.price * item.quantity), 0)
)