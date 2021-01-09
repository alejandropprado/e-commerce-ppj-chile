import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

import { useCart } from '../../Cart/hooks/cart.hook'

const Product = ({ product }) => {
  const {
    name,
    image,
    type,
    head,
    tail,
    price,
  } = product
  const { addItemToCart } = useCart()

  const addToCart = () => {
    const cartItem = { id: `${head}${tail}`, quantity: 1 }
    
    addItemToCart(cartItem)
  }

  return (
    <div style={{ ...styles.flexOne, ...styles.container }}>
      <div style={{ ...styles.flexOne, ...styles.content }}>
        <div style={{ ...styles.flexOne, ...styles.centered, ...styles.contentImage }}>
          <div style={{ ...styles.image, backgroundImage: `url(${image})` }} />
        </div>
        <div style={styles.containerDescription}>
          <div style={{ ...styles.flexOne, ...styles.contentDescription }}>
            <span style={styles.title}>
              {name}
            </span>
            <span style={styles.subtitle}>
              {type}
            </span>
            <div style={styles.pricing}>
              ${price.toLocaleString('es-CL')}
            </div>
          </div>
          <div style={styles.contentButton}>
            <Button block variant='dark' onClick={addToCart}>
              <FontAwesomeIcon icon={faCartPlus} /> {'Agregar al carro'}
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}
const styles = {
  flexOne: {
    display: 'flex',
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 15,
    border: 'solid 1px #e3e3e3'
  },
  content: {
    flexDirection: 'column',
    borderRadius: 15,
    boxSizing: 'border-box',
    padding: 15,
  },
  contentImage: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 15
  },
  contentImageList: {
    width: 64,
    height: 64,
    maxWidth: 64,
    maxHeight: 64,
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 200,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  imageList: {
    width: '100%',
    height: '100%',
  },
  containerDescription: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    marginTop: 15,
  },
  contentDescription: { flexDirection: 'column' },
  title: { fontSize: 14, fontWeight: 'bold' },
  subtitle: { fontSize: 12, fontWeight: '400' },
  pricing: { fontSize: 14, fontWeight: 'bold', textAlign: 'end' },
  contentButton: { flex: 1, margin: '15px 0' },
}

export default Product
