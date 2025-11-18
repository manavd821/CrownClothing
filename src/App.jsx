import Home from "./routes/home/home.component"
import { Routes, Route } from 'react-router'
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component"
import CheckOutPage from "./routes/checkout-page/checkout-page.component"
import { checkUserSession } from "./store/user/user.actions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [])
    return(
      <Routes>
        
        <Route path="/" element= {<Navigation/>}>
          <Route index element= {<Home/>}/>
          <Route path="shop/*" element= {<Shop/>}/>
          <Route path="auth" element= {<Authentication/>}/>
          <Route path="/checkout" element = {<CheckOutPage/>}/>
        </Route>
          
      </Routes>
    )
}

export default App
