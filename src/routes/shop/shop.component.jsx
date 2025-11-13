import {Routes, Route} from 'react-router'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/category/category.actions';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
            const getCategoryMap = async() =>{
                const categoryMap =  await getCategoriesAndDocuments();
                // console.log(categoryMap)
                dispatch(setCategories(categoryMap))
            }
            getCategoryMap();
        },[])
    return (
        <Routes>
            <Route index element = {<CategoriesPreview/>}/>
            <Route path=':category' element = {<Category/>}/>
        </Routes>
    );
};

export default Shop;
