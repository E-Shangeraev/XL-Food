/* eslint-disable no-underscore-dangle */
import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import Product from '../Product/Product'
import './ProductsBlock.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const ProductsBlock = ({ id, title, items, getVisibleId }) => {
  const productsBlockRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: '0px',
    treshold: 1.0,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (productsBlockRef.current) observer.observe(productsBlockRef.current)

    return () => {
      if (productsBlockRef.current) observer.unobserve(productsBlockRef.current)
    }
  }, [productsBlockRef, options])

  useEffect(() => {
    if (isVisible) {
      getVisibleId(productsBlockRef.current.id)
      // console.log(productsBlockRef.current.id, 'is visible')
    }
  }, [isVisible])

  return (
    <section className="products" id={id} ref={productsBlockRef}>
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
            image={`${AWS_URL}${product.uploadedFile.path[0]}`}
          />
        ))}
      </ul>
    </section>
  )
}

ProductsBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  getVisibleId: PropTypes.func.isRequired,
}

ProductsBlock.defaultProps = {
  id: null,
  items: [],
}

export default ProductsBlock
