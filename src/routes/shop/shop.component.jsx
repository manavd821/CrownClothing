import {Routes, Route} from 'react-router'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/category/category.actions';
import { fetchCategoryStart } from '../../store/category/category.actions';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(fetchCategoryStart());
        },[])
    return (
        <Routes>
            <Route index element = {<CategoriesPreview/>}/>
            <Route path=':category' element = {<Category/>}/>
        </Routes>
    );
};

export default Shop;
