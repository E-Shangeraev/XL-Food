import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { addToCart, minusCartItem } from '../../redux/actions/cart'
import Button from '../Button/Button'
import noImage from '../../assets/img/no_image.jpg'

import './Product.scss'

const Product = ({ id, name, weight, composition, price, image }) => {
  const dispatch = useDispatch()
  const [addedCount, setAddedCount] = useState(0)
  const cartItems = useSelector(({ cart }) => cart.items)

  const handleMinusClick = () => {
    setAddedCount(prev => (prev >= 1 ? prev - 1 : 0))
    dispatch(minusCartItem(id))
  }
  const handlePlusClick = () => {
    setAddedCount(prev => prev + 1)
    dispatch(addToCart({ id, name, image, price }))
  }

  useEffect(() => {
    if (cartItems[id]) {
      setAddedCount(cartItems[id].count)
    }
  }, [])

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
                <Button
                  style={{
                    color: '#a7a7a7',
                    border: '1px solid #a7a7a7',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                  hover={{
                    border: '1px solid black',
                    color: 'black',
                  }}
                  onClick={handleMinusClick}>
                  -
                </Button>
                <b>{addedCount}</b>
              </>
            )}
            <Button
              style={{
                color: '#a7a7a7',
                border: '1px solid #a7a7a7',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
              hover={{
                border: '1px solid black',
                color: 'black',
              }}
              onClick={handlePlusClick}>
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
  id: PropTypes.string.isRequired,
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
