import { Link } from 'react-router-dom'

const CartEmpty = () => (
  <section className="cart cart--empty">
    <h2 className="cart__title">Ваша корзина пуста</h2>
    <Link to="/" className="cart__back">
      К меню
    </Link>
  </section>
)

export default CartEmpty
