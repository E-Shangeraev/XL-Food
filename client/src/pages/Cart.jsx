import { Link } from 'react-router-dom'

const Cart = () => (
  <main className="main">
    <h1 className="visually-hidden">Cart</h1>
    <div className="main__container">
      <Link to="/">Вернуться на главную</Link>
    </div>
  </main>
)

export default Cart
