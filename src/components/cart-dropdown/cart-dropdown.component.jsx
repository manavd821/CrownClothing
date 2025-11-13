import Button from '../button/button.component'
import { useNavigate } from 'react-router'
import {
  CartDropdownContainer,
  CartItemContainer,
  ItemDetails, 
  Name, 
  Price,
  EmptyMessage,
} from './cart-dropdown.styles';
import { selectUserSelectedProducts } from '../../store/userCart/userCart.selectors';
import { setIsCartOpen } from '../../store/userCart/userCart.actions';
import { useSelector, useDispatch } from 'react-redux';

export default function CartDropDown({...otherProps}) {

  const dispatch = useDispatch();
  const userSelectedProducts = useSelector(selectUserSelectedProducts);

  const navigate = useNavigate()
  const goToCheckOutHandler = () => {
    navigate('/checkout');
    dispatch(setIsCartOpen(false));
  }
  
  return (
    <CartDropdownContainer
      {...otherProps}
    >
    {
      userSelectedProducts.length ? (
        <>
          {userSelectedProducts.map(product => (
            <CartItemContainer
              key={product.id}
            >
              <img
                    src={product.imageUrl}
                    alt={product.name}
                />
              <ItemDetails>
                <Name as='span'>{product.name}</Name>
                <Price as='span'>{product.quantity} X {product.price}</Price>
              </ItemDetails>

            </CartItemContainer>
          ))}
        </>
        
      ) : (
        <EmptyMessage>
          No Product Selected
        </EmptyMessage>
      )
    }
        <Button
          onClick = {goToCheckOutHandler}
        >
          GO TO CHECKOUT
        </Button> 
      
    </CartDropdownContainer>
  )
}
