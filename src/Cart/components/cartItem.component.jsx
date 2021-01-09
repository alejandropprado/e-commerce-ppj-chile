import React from 'react'
import { Media, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faMinus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { useCart } from '../hooks/cart.hook'

const CartItem = ({ product }) => {
  const { image, name, type, price, id, quantity } = product
  const {
    addItemToCart,
    deleteItemToCart,
    updateItemToCart,
  } = useCart()

  return (
    <Media style={styles.media}>
      <div
        className='align-self-center mr-3'
        style={{
          ...styles.flexOne,
          ...styles.centered,
          ...styles.contentImageList,
        }}
      >
        <div
          style={{
            ...styles.image,
            ...styles.imageList,
            backgroundImage: `url(${image})`,
          }}
        />
      </div>
      <Media.Body>
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
      </Media.Body>
      <div style={{
        ...styles.flexOne,
        ...styles.centered,
        ...styles.totalContent,
      }}>
        <div>Total</div>
        <div>${(price * quantity).toLocaleString('es-CL')}</div>
      </div>
      <div style={{ ...styles.flexOne, ...styles.centered, height: '100%', justifyContent: 'space-between' }}>
        <Button
          variant='outline-secondary'
          onClick={() => deleteItemToCart({ id })}
          size='sm'
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <b>
          {quantity}
        </b>
        <Button
          variant='outline-secondary'
          onClick={() => addItemToCart({ id, quantity: 1 })}
          size='sm'
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <div style={{ ...styles.flexOne, ...styles.centered, height: '100%' }}>
        <Button
          variant='outline-secondary'
          size='sm'
          onClick={() => updateItemToCart({ id, quantity: 0 })}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </Media>
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
  imageList: {
    borderRadius: 15,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  },
  contentImageList: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 15,
    width: 64,
    height: 64,
    maxWidth: 64,
    maxHeight: 64,
  },
  contentDescription: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
  },
  pricing: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },
  media: {
    width: '100%',
    padding: 10,
    margin: 10,
    border: 'solid 1px #e3e3e3',
    borderRadius: 15,
  },
  totalContent: {
    height: '100%',
    flexDirection: 'column',
    fontSize: 14,
    padding: '0 15px',
  }
}

export default CartItem
