/* eslint-disable max-len */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartEmpty from '../../components/Cart/CartEmpty'
import CartSuccessful from '../../components/Cart/CartSuccessful'
import CartOrder from '../../components/Cart/CartOrder'
import './cart.scss'

const Cart = () => {
  const {
    items: cartItems,
    totalPrice,
    totalCount,
  } = useSelector(({ cart }) => cart)
  const [submited, setSubmited] = useState(false)

  const onSubmit = val => setSubmited(val)

  return (
    <main className="main">
      <h1 className="visually-hidden">Корзина товаров</h1>
      <div className="main__container">
        <Link to="/" className="back">
          <svg
            width="31"
            height="8"
            viewBox="0 0 31 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM31 3.5L1 3.5V4.5L31 4.5V3.5Z"
              fill="#A7A7A7"
            />
          </svg>
          К меню
        </Link>
        {totalCount > 0 && (
          <CartOrder
            cartItems={cartItems}
            totalPrice={totalPrice}
            handleSubmit={onSubmit}
          />
        )}
        {!totalCount && submited && <CartSuccessful in={submited} />}
        {!totalCount && !submited && <CartEmpty />}
      </div>
    </main>
  )
}

export default Cart
