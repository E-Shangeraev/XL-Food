import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Information from '../Information/Information'
import './Header.scss'

const Header = () => (
  <header className="header">
    <Link to="/">XL Foods</Link>
    <div>
      <a className="header__phone" href="tel:+7-999-999-99-99">
        +7-999-999-99-99
      </a>
      <Modal btnText="Информация" btnColor="primary" containerClass="info">
        <Information />
      </Modal>
      <Link to="/cart">Корзина</Link>
    </div>
  </header>
)

export default Header
