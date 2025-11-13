import { createSelector } from "reselect"

export const selectCategoryReducer = state => state.category ;

export const selectCategoriesArray = createSelector(
    [selectCategoryReducer],
    categorySlice => categorySlice.categories
)

export const selectCategory = createSelector(
    [selectCategoriesArray],
    categories => categories.reduce((acc, category) => {
        const {items, title} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)
