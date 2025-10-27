import { useContext } from "react"
import { UserCartContext } from "../../contexts/userCart.context"
import './checkOutlist.styles.scss'

export default function CheckOutList() {
    const {
        userSelectedProducts, 
        totalPrice,
        removeItemFromCart,
        decreaseQuantityByOne,
        addItemToCart,
        clearAllItems,
    } = useContext(UserCartContext);

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
                                <button onClick={() => decreaseQuantityByOne(product)}>{'<'}</button>
                                {product.quantity}
                                <button onClick={() => addItemToCart(product)}>{'>'}</button>
                            </td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => removeItemFromCart(product)}>X</button>
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
                                onClick={() => clearAllItems()}
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
