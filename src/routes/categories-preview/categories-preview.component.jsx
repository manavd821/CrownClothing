import { CategoriesContext } from "../../contexts/categories.context";
import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const { categories } = useContext(CategoriesContext);
    return (
        <Fragment>
        {Object.keys(categories).map((title) => {
            const products = categories[title]
            return <CategoryPreview key={title} products={products} title={title}/>
        })}
        </Fragment>
    );
};

export default CategoriesPreview;
