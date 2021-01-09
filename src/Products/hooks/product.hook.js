/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import {
  SET_PRODUCTS,
} from '../actions/products.action'
import { useFetchQuery } from '../../hooks'

export const useProducts = () => {
  const {
    data: products,
    searchCompleted,
  } = useSelector(state => state.Products)
  const dispatch = useDispatch()
  const params = useParams()
  const [paginate, setPaginate] = useState({ prev: 0, next: 20 })
  const [hasMore, setHasMore] = useState(false)
  const [current, setCurrent] = useState([])
  const productsFilteredByType = useMemo(
    () => params.type
      ? products.filter(product => product.type === params.type)
      : products,
    [params.type, products],
  )
  const productskeyedByID = useMemo(
    () => _.keyBy(products, product => `${product.head}${product.tail}`),
    [products],
  )

  const getMoreData = () => {
    if (current.length === productsFilteredByType.length) {
      setHasMore(false)

      return
    }

    setTimeout(() => {
      setCurrent(current.concat(productsFilteredByType.slice(paginate.prev + 20, paginate.next + 20)))
      setPaginate(state => ({ prev: state.prev + 20, next: state.next + 20 }))
    }, 1500)
  }

  const {
    data,
    error,
    isLoading,
  } = useFetchQuery('Products', 'https://www.amiiboapi.com/api/amiibo/')

  useEffect(() => {
    if (data && data.amiibo?.length && !searchCompleted) {
      const productsWithPrice = data.amiibo.map(product => ({
        ...product,
        price: Math.floor(Math.random() * 40000),
      }))

      dispatch(SET_PRODUCTS(productsWithPrice))
    }
  }, [data])
  useEffect(() => {
    setCurrent(productsFilteredByType.slice(0, 20))
    setPaginate({ prev: 0, next: 20 })
    setHasMore(true)
  }, [params.type, productsFilteredByType])

  if (isLoading) return { isLoading }

  if (error) return { error }

  return {
    products,
    paginateProducts: current,
    hasMore,
    getMoreData,
    productskeyedByID,
    searchCompleted,
  }
}