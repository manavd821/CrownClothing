import Button from '../button/button.component'
import { useContext } from 'react'
import { UserCartContext } from '../../contexts/userCart.context'
import { useNavigate } from 'react-router'
import {
  CartDropdownContainer,
  CartItemContainer,
  ItemDetails, 
  Name, 
  Price,
  EmptyMessage,
} from './cart-dropdown.styles';

export default function CartDropDown({...otherProps}) {
  const { userSelectedProducts } = useContext(UserCartContext);
  const { setIsCartOpen } = useContext(UserCartContext);
  const navigate = useNavigate()
  const goToCheckOutHandler = () => {
    navigate('/checkout');
    setIsCartOpen(false);
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
