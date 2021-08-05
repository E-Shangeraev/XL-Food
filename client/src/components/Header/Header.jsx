/* eslint-disable max-len */
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Information from '../Information/Information'
import './Header.scss'

const Header = () => (
  <header className="header">
    <div className="header__container">
      <Link to="/" className="header__logo">
        XL Food
      </Link>
      <div>
        <a className="header__phone" href="tel:+7-999-999-99-99">
          +7-999-999-99-99
        </a>
        <Modal
          btnImage={
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              className="header_info__2HheJ">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          }
          containerClass="info">
          <Information />
        </Modal>
        <div className="header__cart">
          <Link to="/cart">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              className="header_cart__y0MZo">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-1.45-5c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6z" />
            </svg>
          </Link>
          <span className="header__cart-count">1</span>
        </div>
      </div>
    </div>
  </header>
)

export default Header
