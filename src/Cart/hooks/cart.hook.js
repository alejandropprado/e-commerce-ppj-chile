/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
  SET_CART,
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  UPDATE_ITEM_CART,
  REMOVE_CART,
} from '../actions/cart.action'
import { useProducts } from '../../Products/hooks/product.hook'

export const useCart = () => {
  const { data: cart, searchCompleted } = useSelector(state => state.Cart)
  const {
    searchCompleted: productsSearchCompleted,
    productskeyedByID,
  } = useProducts()
  const dispatch = useDispatch()

  const setCart = () => {
    const cartStorageJson = localStorage.getItem('cart')
    const cartStorage = JSON.parse(cartStorageJson)

    dispatch(SET_CART(cartStorage || []))
  }
  const totalQuantity = useMemo(
    () => cart.reduce((acum, value) => acum + value.quantity, 0),
    [cart]
  )
  const cartWithProducts = useMemo(
    () => productsSearchCompleted
      ? cart.reduce((acum, item) => {
        const product = productskeyedByID[item.id] || {}

        return {
          data: acum.data.concat({ ...product, ...item }),
          total: acum.total + (product.price * item.quantity),
        }
      }, { data: [], total: 0 })
      : { data: [], total: 0 },
    [productsSearchCompleted, cart, productskeyedByID],
  )
  const addItemToCart = cartItem => {
    toast.info('Se ha añadido un objeto a tu carrito')
    dispatch(ADD_ITEM_CART(cartItem))
  }
  const deleteItemToCart = cartItem => dispatch(DELETE_ITEM_CART(cartItem))
  const updateItemToCart = cartItem => dispatch(UPDATE_ITEM_CART(cartItem))
  const removeCart = () => window.confirm('¿Seguro que desea eliminar todo el carrito?')
      && dispatch(REMOVE_CART())

  useEffect(() => {
    if (!searchCompleted) {
      setCart()
    }

    productsSearchCompleted && localStorage.setItem('cart', JSON.stringify(cart))
  }, [productsSearchCompleted, cart])

  return {
    cart,
    addItemToCart,
    deleteItemToCart,
    updateItemToCart,
    removeCart,
    totalQuantity,
    searchCompleted,
    cartWithProducts,
  }
}