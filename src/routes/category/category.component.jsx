import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router'
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'

export default function Category() {
    const { category } = useParams();
    const {categories} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categories[category]);

    useEffect(()=> {
        setProducts(categories[category]);
    },[category, categories]);

    return (
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
            { products &&
                products.map(product => <ProductCard product={product} key={product.id}/>)
            }
        </div>
        </>
    )
}
