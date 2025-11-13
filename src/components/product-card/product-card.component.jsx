import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {
  ProductCardContainer,
  Footer,
} from './product-card.styles'
import { addItemToCart } from '../../store/userCart/userCart.actions';
import { selectUserSelectedProducts } from '../../store/userCart/userCart.selectors';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductCard({ product }) {
  const {name, price, imageUrl} = product;
  const userSelectedProducts = useSelector(selectUserSelectedProducts);
  const dispatch = useDispatch();
  const addProductToCard = () => dispatch(addItemToCart(userSelectedProducts, product));

  return (
    <ProductCardContainer>
      <img
        src={imageUrl}
        alt={name}
      />
      <Footer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </Footer>
      <Button 
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCard}
      >Add to Cart</Button>
    </ProductCardContainer>
  )
}
