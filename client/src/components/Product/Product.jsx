import { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../Button/Button'

import './Product.scss'

const Product = ({ name, description, price, image }) => {
  const [addedCount, setAddedCount] = useState(0)

  const handleMinusClick = () => {
    setAddedCount(prev => (prev >= 1 ? prev - 1 : 0))
  }
  const handlePlusClick = () => setAddedCount(prev => prev + 1)

  return (
    <li className={classNames('product', { 'product--added': addedCount > 0 })}>
      <div className="product__description">
        <div className="product__top">
          <span className="product__name">{name}</span>
          <p className="product__compound">{description}</p>
        </div>
        <div className="product__bottom">
          <b className="product__price">{price.toLocaleString('ru-RU')} ₽</b>
          <div className="product__counter">
            {addedCount > 0 && (
              <>
                <Button onClick={handleMinusClick} outlined>
                  -
                </Button>
                <b>{addedCount}</b>
              </>
            )}
            <Button onClick={handlePlusClick} outlined>
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="product__photo">
        <img src={image} alt="ORIGINAL Бургер" />
      </div>
    </li>
  )
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}

export default Product
