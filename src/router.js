import React from 'react'
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom'

import NavBar from './components/navBar.component'
import Products from './Products/products.container'
import Cart from './Cart/cart.container'
import CartModal from './Cart/components/cartModal.component'

export default function Router() {
  const location = useLocation()
  const background = location?.state?.background

  return (
    <>
      <NavBar />
      <Switch location={background || location}>
        <Route exact path='/' children={<Products />} />
        <Route path='/products/:type' children={<Products />} />
        <Route exact path='/cart' children={<Cart />} />
      </Switch>
      {background && <Route path='/products/cart' children={<CartModal />} />}
    </>
  )
}
