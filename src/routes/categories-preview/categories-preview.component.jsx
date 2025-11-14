import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategory, selectCategoriesIsLoading } from "../../store/category/category.selectors";
import { Spinner } from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categories = useSelector(selectCategory);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <Fragment>
        {
            isLoading 
            ? (
            <Spinner/>
            )
            : (
                Object.keys(categories).map((title) => {
                    const products = categories[title]
                    return <CategoryPreview key={title} products={products} title={title}/>
                })
            )
        }
        </Fragment>
    );
};

export default CategoriesPreview;
