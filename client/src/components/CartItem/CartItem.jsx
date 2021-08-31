import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  addToCart,
  minusCartItem,
  removeCartItem,
} from '../../redux/actions/cart'
import Button from '../Button/Button'

import './CartItem.scss'

const CartItem = ({ id }) => {
  const dispatch = useDispatch()
  const { image, name, count, price, totalPrice } = useSelector(
    ({ cart }) => cart.items[id],
  )

  const handleMinusClick = () => {
    dispatch(minusCartItem(id))
  }
  const handlePlusClick = () => {
    dispatch(addToCart({ id, name, image, price }))
  }
  const handleRemoveClick = () => {
    dispatch(removeCartItem(id))
  }

  return (
    <li className="cart-item">
      <img className="cart-item__image" src={image} alt={name} />
      <div>
        <div className="cart-item__top">
          <span className="cart-item__name">{name}</span>
          <Button className="cart-item__remove" onClick={handleRemoveClick}>
            Закрыть
          </Button>
        </div>
        <div className="cart-item__bottom">
          <div className="cart-item__counter">
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
            <b>{count}</b>
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
          <p className="cart-item__price">
            {`${price} x ${count} = ${totalPrice.toLocaleString('ru-RU')} ₽`}
          </p>
        </div>
      </div>
    </li>
  )
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
}

export default CartItem
