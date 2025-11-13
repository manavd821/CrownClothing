import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategory } from "../../store/category/category.selectors";

const CategoriesPreview = () => {
    const categories = useSelector(selectCategory);
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
