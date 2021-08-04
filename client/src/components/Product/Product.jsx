import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import image from './1.jpg'

const Product = props => (
  <li className="product">
    <div className="product__description">
      <span className="product__name">ORIGINAL Бургер</span>
      <p className="product__compound">
        C котлетой из говядины, сыром чеддер и соусом BBQ
      </p>
      <div>
        <b className="product__price">380 Р</b>
        <Button>+</Button>
      </div>
    </div>
    <img src={image} alt="ORIGINAL Бургер" />
  </li>
)

Product.propTypes = {}

export default Product
