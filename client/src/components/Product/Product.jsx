import { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../Button/Button'
import noImage from './no_image.jpg'

import './Product.scss'

const Product = ({ name, weight, composition, price, image }) => {
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
          {weight && <span className="product__weight">{weight} гр</span>}
          {composition && (
            <p className="product__compound">
              <span>Состав:</span> {composition}
            </p>
          )}
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
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <img src={noImage} alt={name} />
        )}
      </div>
    </li>
  )
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number,
  composition: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
}

Product.defaultProps = {
  weight: null,
  composition: null,
  image: null,
}

export default Product
