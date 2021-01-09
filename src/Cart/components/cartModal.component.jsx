import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import CartContainer from '../cart.container'
import { useCart } from '../hooks/cart.hook'

export default function CartModalComponent() {
  const history = useHistory()
  const handleClose = () => history.goBack()
  const { cartWithProducts, removeCart } = useCart()

  return (
    <Modal
      show
      onHide={handleClose}
      backdrop='static'
      keyboard
      centered
      size='lg'
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>{'Carro de compras'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartContainer listOnly />
      </Modal.Body>
      <Modal.Footer>
        <b className='mr-auto'>
          Total: ${cartWithProducts.total?.toLocaleString('es-CL')}
        </b>
        <Button
          variant='secondary'
          onClick={removeCart}
          disabled={!cartWithProducts.data.length}
        >
          Borrar todo
        </Button>
        <Button
          variant='primary'
          onClick={() => cartWithProducts.data.length
            ? history.push('/cart')
            : history.goBack()
          }
        >
          {!cartWithProducts.data.length ? 'Ir a comprar' : 'Ir a pagar'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}