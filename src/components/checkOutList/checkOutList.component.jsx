import './checkOutlist.styles.scss'
import { 
    useSelector,
    useDispatch,
} from "react-redux";
import { 
    selectUserSelectedProducts,
    selectTotalPrice,
} from "../../store/userCart/userCart.selectors";
import { 
    addItemToCart ,
    removeItemFromCart,
    decreaseQuantityByOne,
    clearAllItems,
} from "../../store/userCart/userCart.actions";
export default function CheckOutList() {

    const userSelectedProducts = useSelector(selectUserSelectedProducts);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();

    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    userSelectedProducts.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src = {product.imageUrl}
                                    alt={product.name}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>
                                <button onClick={() => dispatch(decreaseQuantityByOne(userSelectedProducts, product))}>{'<'}</button>
                                {product.quantity}
                                <button onClick={() => dispatch(addItemToCart(userSelectedProducts, product))}>{'>'}</button>
                            </td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => dispatch(removeItemFromCart(userSelectedProducts, product))}>X</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            {
                totalPrice !== 0 && (
                <tfoot>
                    <tr>
                        <td colSpan={5} className="footer-row">
                        <div className="footer-actions">
                            <button 
                                className="clear-btn"
                                onClick={() => dispatch(clearAllItems())}
                            >Clear Cart</button>
                            <span className="total">TOTAL: ${totalPrice}</span>
                        </div>
                        </td>
                    </tr>
                </tfoot>)
            }
        </table>
    )
}
