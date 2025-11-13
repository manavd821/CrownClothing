import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoryReducer } from "./category/category.reducer";
import { userCartReducer } from "./userCart/userCart.reducer";

export const rootReducer = combineReducers({
    user : userReducer,
    category : categoryReducer,
    userCart : userCartReducer,
})