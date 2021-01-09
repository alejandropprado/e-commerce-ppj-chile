import React from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCcVisa,
  faCcMastercard,
} from '@fortawesome/free-brands-svg-icons'

import CartItem from './components/cartItem.component'
import MarioLoading from '../components/marioLoading.component'
import { useCart } from './hooks/cart.hook'

const WithoutData = () => (
  <div style={{ ...styles.centered, ...styles.withoutData }}>
    No se han añadido items para comprar
  </div>
)

export default function CartContainer({ listOnly }) {
  const {
    searchCompleted,
    cartWithProducts,
    removeCart,
  } = useCart()
  const {
    searchCompleted: productSearchComplete,
  } = useSelector(state => state.Products)

  if (!productSearchComplete || !searchCompleted) {
    return (
      <div style={styles.loadingContainer}>
        <MarioLoading width={200} height={200} />
      </div>
    )
  }

  if (listOnly) {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Row>
              {!cartWithProducts.data.length && (
                <WithoutData />
              )}
              {cartWithProducts.data.map(product => (
                <CartItem
                  key={product.id}
                  product={product}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container style={styles.container} fluid>
      <Row className='justify-content-center' style={styles.content}>
        <Col xs={12} md={7} style={styles.containerCart}>
          <div style={{
            ...styles.flex,
            ...styles.centered,
            ...styles.fullWidthHeight,
            flexDirection: 'column',
          }}>
            <Row style={styles.contentCart}>
              {!cartWithProducts.data.length && (
                <WithoutData />
              )}
              {cartWithProducts.data.map(product => (
                <CartItem
                  key={product.id}
                  product={product}
                />
              ))}
            </Row>
            <Row style={styles.contentCartFooter}>
              <Col xs={6} style={{ ...styles.flex, ...styles.totalCol }}>
                <b>TOTAL: ${cartWithProducts.total.toLocaleString('es-CL')}</b>
              </Col>
              <Col xs={6} style={{ ...styles.flex, ...styles.deleteCol }}>
                <Button
                  variant='outline-secondary'
                  onClick={removeCart}
                  disabled={!cartWithProducts.data.length}
                >
                  Eliminar todo
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          xs={12}
          md={5}
          style={styles.containerCard}>
          <div style={styles.contentCard}>
            <div>
              <h3>Detalle del pago</h3>
            </div>
            <div style={styles.creditCardTypeIcon}>
              <FontAwesomeIcon icon={faCcVisa} style={styles.icon} />
              <FontAwesomeIcon icon={faCcMastercard} style={styles.icon} />
            </div>
            <div>
              <Form.Group controlId='card-name'>
                <Form.Label>Nombre de la tarjeta</Form.Label>
                <Form.Control type='text' placeholder='Juan Perez Perez' />
              </Form.Group>
              <Form.Group controlId='card-number'>
                <Form.Label>Numero de la tarjeta</Form.Label>
                <Form.Control type='number' placeholder='1111111111111111' />
              </Form.Group>
            </div>
            <div style={{ ...styles.centered, ...styles.contentCardExpire }}>
              <Form.Group controlId='mm' style={styles.month}>
                <Form.Label>Mes</Form.Label>
                <Form.Control type='number' placeholder='7' min={1} max={12} />
              </Form.Group>
              <Form.Group controlId='yyyy' style={styles.year}>
                <Form.Label>Año</Form.Label>
                <Form.Control type='number' placeholder='2023' min={2021} />
              </Form.Group>
              <Form.Group controlId='ccv' style={styles.ccv}>
                <Form.Label>CCV</Form.Label>
                <Form.Control type='number' placeholder='***' />
              </Form.Group>
            </div>
            <div style={styles.contentButton}>
              <Button variant='secondary' block disabled={!cartWithProducts.data.length}>
                Hacer el pedido
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { height: '100%' },
  content: { height: '100%', alignItems: 'center' },
  containerCart: { width: '100%', height: '90%' },
  flex: { display: 'flex', flex: 1 },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthHeight: { width: '100%', height: '100%' },
  contentCart: {
    overflowY: 'scroll',
    paddin: 25,
    maxHeight: 'calc(100% - 90px)',
    width: '100%',
    marginBottom: 90,
  },
  contentCartFooter: {
    height: 90,
    width: '100%',
    margin: 0,
    borderTop: 'solid 2px #e3e3e3',
    position: 'absolute',
    bottom: 0,
  },
  totalCol: { justifyContent: 'flex-start', alignItems: 'center' },
  deleteCol: { justifyContent: 'flex-end', alignItems: 'center' },
  containerCard: {
    width: '100%',
    height: 'calc(100% + 20px)',
    backgroundColor: '#e3e3e3',
    marginTop: -10,
  },
  contentCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 25px',
  },
  creditCardTypeIcon: { margin: '10px -10px', fontSize: '3em' },
  icon: { margin: '0 10px' },
  contentCardExpire: {
    margin: '0 -10px',
    width: '100%',
    justifyContent: 'flex-start',
  },
  month: { margin: '0 10px', width: 60 },
  year: { margin: '0 10px', width: 85 },
  ccv: { margin: '0 10px', width: 70 },
  contentButton: { marginTop: 25 },
  withoutData: {
    fontSize: '1.4em',
    width: '100%',
  },
}
