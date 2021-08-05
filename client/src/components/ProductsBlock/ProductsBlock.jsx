import React from 'react'
import PropTypes from 'prop-types'
import Product from '../Product/Product'
import image from './1.jpg'
import './ProductsBlock.scss'

const ProductsBlock = ({ id, title }) => (
  <section className="products" id={id}>
    <h2 className="title">{title}</h2>
    <ul className="products__list">
      <Product
        name="ORIGINAL Бургер"
        description="C котлетой из говядины, сыром чеддер и соусом BBQ"
        price={380}
        image={image}
      />
      <Product
        name="ORIGINAL Бургер"
        description="C котлетой из говядины, сыром чеддер и соусом BBQ"
        price={380}
        image={image}
      />
      <Product
        name="ORIGINAL Бургер"
        description="C котлетой из говядины, сыром чеддер и соусом BBQ"
        price={380}
        image={image}
      />
      <Product
        name="ORIGINAL Бургер"
        description="C котлетой из говядины, сыром чеддер и соусом BBQ"
        price={380}
        image={image}
      />
    </ul>
  </section>
)

ProductsBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
}

ProductsBlock.defaultProps = {
  id: null,
}

export default ProductsBlock
