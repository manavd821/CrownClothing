import { Fragment, useContext } from "react"
import {  Outlet } from "react-router"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"

import CrownLogo from '../../assets/crown.svg'
import { signOutAuthUser } from "../../utils/firebase/firebase.utils"
import { useEffect } from "react"
import { useRef } from "react"
import { UserCartContext } from "../../contexts/userCart.context"
import {NavigationContainer, LogoContainer,NavLinksContainer, NavLinks} from'./navigation.styles'
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selectors"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const {isCartOpen, setIsCartOpen} = useContext(UserCartContext);
  const cartRef = useRef(null);

  useEffect(()=>{
    const handleClickOutsideDropDownBox = (e) =>{
      if(cartRef.current && !cartRef.current.contains(e.target)) setIsCartOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutsideDropDownBox);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropDownBox);
    }
  },[])

  return (
  <Fragment>
    <NavigationContainer>
        <LogoContainer to='/'>
            <img className="logo" src={CrownLogo} alt="Crown Logo" />
        </LogoContainer>
        <NavLinksContainer>
            <NavLinks to="/shop">SHOP</NavLinks> 
            {
              currentUser ? (
                <NavLinks as='span' className="nav-link" onClick={signOutAuthUser}>SIGN OUT</NavLinks>
              ) : (
              <NavLinks to="/auth">SIGN IN</NavLinks>
              )
            }
            <CartIcon onClick = {() => setIsCartOpen(prev => !prev)}/>
        </NavLinksContainer>
        {isCartOpen && <CartDropDown ref = {cartRef}/>}
    </NavigationContainer>
    <Outlet/>
  </Fragment>
)}
export default Navigation