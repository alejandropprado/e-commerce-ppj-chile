/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'

import Product from './components/product.component'
import MarioLoading from '../components/marioLoading.component'
import { useProducts } from './hooks/product.hook'

const Products = () => {
  const {
    paginateProducts,
    hasMore,
    getMoreData,
    isLoading,
    error,
  } = useProducts()

  if (isLoading) return (
    <div style={{...styles.centered, ...styles.loadingContainer}}>
      <MarioLoading />
    </div>
  )

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Container>
      <Row>
        <InfiniteScroll
          dataLength={paginateProducts.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={(
            <div style={styles.centered}>
              <MarioLoading />
            </div>
          )}
          className='row'
        >
          {paginateProducts.map(product => (
            <Col
              key={`${product.head}${product.tail}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ margin: '10px 0' }}
            >
              <Product product={product} listView />
            </Col>
          ))}
        </InfiniteScroll>
      </Row>
    </Container>
  )
}

const styles = {
  centered: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
  },
}

export default Products
