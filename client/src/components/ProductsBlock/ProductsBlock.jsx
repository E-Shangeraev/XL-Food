import React from 'react'
import PropTypes from 'prop-types'
import Product from '../Product/Product'
import './ProductsBlock.scss'

const ProductsBlock = props => (
  <section className="products">
    <h2 className="title">Бургеры</h2>
    <ul>
      <Product />
    </ul>
  </section>
)

ProductsBlock.propTypes = {}

export default ProductsBlock
