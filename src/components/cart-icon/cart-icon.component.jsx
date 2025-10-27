import ShoppingIcon from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import { UserCartContext } from '../../contexts/userCart.context'
import {
  CartIconContainer,
  ShoppingImage,
  ItemCount,
} from './cart-icon.styles'

export default function CartIcon({...otherProps}) {
  const {totalItems} = useContext(UserCartContext);
  return (
    <CartIconContainer
      {...otherProps}
    >
        <ShoppingImage as='img' src={ShoppingIcon}/>
        <ItemCount as="span" className='item-count'>{totalItems}</ItemCount>
    </CartIconContainer>
  )
}
