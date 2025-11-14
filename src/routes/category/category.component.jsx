import {  useEffect, useState } from 'react';
import { useParams } from 'react-router'
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'
import { selectCategoriesIsLoading, selectCategory } from '../../store/category/category.selectors';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/spinner/spinner.component';

export default function Category() {
    const { category } = useParams();
    const categories = useSelector(selectCategory);
    const [products, setProducts] = useState(categories[category]);
    const isLoading = useSelector(selectCategoriesIsLoading);
    useEffect(()=> {
        setProducts(categories[category]);
    },[category, categories]);

    return (
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {
            isLoading 
            ? ( <Spinner/>)
            : (
                <div className='category-container'>
                    { products &&
                        products.map(product => <ProductCard product={product} key={product.id}/>)
                    }
                </div>
            )
        }
        </>
    )
}
