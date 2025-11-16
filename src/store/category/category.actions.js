import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export const setCategories = categoriesArray => 
    createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY, categoriesArray)

export const fetchCategoryStart = () => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START);

export const fetchCategorySuccess = (categoriesArray) => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, categoriesArray);

export const fetchCategoryFailed = (error) => 
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, error);
