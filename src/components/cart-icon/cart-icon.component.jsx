import ShoppingIcon from '../../assets/shopping-bag.svg'
import {
  CartIconContainer,
  ShoppingImage,
  ItemCount,
} from './cart-icon.styles'
import { useSelector } from 'react-redux'
import { selectTotalItems } from '../../store/userCart/userCart.selectors'


export default function CartIcon({...otherProps}) {
  const totalItems = useSelector(selectTotalItems);
  return (
    <CartIconContainer
      {...otherProps}
    >
        <ShoppingImage as='img' src={ShoppingIcon}/>
        <ItemCount as="span" className='item-count'>{totalItems}</ItemCount>
    </CartIconContainer>
  )
}
