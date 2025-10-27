import { createContext, useEffect, useState } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categories : {}
})

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        const getCategoryMap = async() =>{
            const categoryMap =  await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategories(categoryMap)
        }
        getCategoryMap();
        
    },[])
    return (
        <CategoriesContext.Provider value={ { categories } }>{children}</CategoriesContext.Provider>
    )
}
