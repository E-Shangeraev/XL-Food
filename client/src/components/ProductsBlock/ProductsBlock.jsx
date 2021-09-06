/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { useElementOnScreen } from '../../hooks/useElementOnScreen'
import Product from '../Product/Product'
import './ProductsBlock.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const ProductsBlock = React.memo(({ id, title, items }) => {
  const dispatch = useDispatch()
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '-50%',
    treshold: 1.0,
  })

  useEffect(() => {
    if (isVisible) {
      dispatch({ type: 'SET_ACTIVE_SECTION_ID', payload: id })
    }
  }, [isVisible])

  return (
    <section className="products" id={id} ref={containerRef}>
      <h2 className="title">{title}</h2>
      <ul className="products__list">
        {items.map(product => (
          <Product
            key={uuidv4()}
            id={product._id}
            name={product.name}
            weight={product.weight}
            composition={product.composition}
            price={product.cost}
            image={
              product.uploadedFile &&
              `${AWS_URL}${product.uploadedFile.path[0]}`
            }
          />
        ))}
      </ul>
    </section>
  )
})

ProductsBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
}

ProductsBlock.defaultProps = {
  id: null,
  items: [],
}

export default ProductsBlock
