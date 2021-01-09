import React from 'react'
import {
  Button,
  Badge,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useHistory } from 'react-router-dom'
import { useCart } from '../hooks/cart.hook'

export default function CartButton() {
  const { totalQuantity } = useCart()
  const location = useLocation()
  const history = useHistory()

  return (
    <Button
      variant='outline-light'
      onClick={() => location.pathname !== '/cart'
        && history.push('/products/cart', { background: location })
      }
    >
      <FontAwesomeIcon icon={faShoppingCart} /> <Badge>{totalQuantity}</Badge>
    </Button>
  )
}
