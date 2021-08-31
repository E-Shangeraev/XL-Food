/* eslint-disable max-len */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Promotions from '../Modal/ModalBody/Promotions'
import DeliveryInfo from '../Modal/ModalBody/DeliveryInfo'
import logo from '../../assets/img/logo.png'
import './Header.scss'

const Header = () => {
  const cartTotalCount = useSelector(({ cart }) => cart.totalCount)

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Логотип XLFood" />
        </Link>
        <div>
          <Modal btnText="Акции и скидки" btnStyle={{ color: 'primary' }}>
            <Promotions />
          </Modal>
          <a className="header__phone" href="tel:+7-999-999-99-99">
            +7-999-999-99-99
          </a>
          <Modal
            btnImage={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.84328 18.6866C14.7273 18.6866 18.6866
                  14.7273 18.6866 9.84328C18.6866 4.95927 14.7273
                  1 9.84328 1C4.95927 1 1 4.95927 1 9.84328C1 14.7273
                  4.95927 18.6866 9.84328 18.6866Z"
                  stroke="#A7A7A7"
                  strokeWidth="1.38088"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.84326 6.30599V9.8433"
                  stroke="#A7A7A7"
                  strokeWidth="1.38088"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14H10.0091"
                  stroke="#A7A7A7"
                  strokeWidth="1.38088"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            containerClass="info">
            <DeliveryInfo />
          </Modal>
          <div className="header__cart">
            <Link to="/cart">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.42449 18.6866C8.88964 18.6866 9.26671 18.3095 9.26671 17.8444C9.26671 17.3792 8.88964 17.0021 8.42449 17.0021C7.95935 17.0021 7.58228 17.3792 7.58228 17.8444C7.58228 18.3095 7.95935 18.6866 8.42449 18.6866Z"
                  stroke="#A7A7A7"
                  strokeWidth="1.60013"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.6887 18.6866C18.1538 18.6866 18.5309 18.3095 18.5309 17.8444C18.5309 17.3792 18.1538 17.0021 17.6887 17.0021C17.2235 17.0021 16.8464 17.3792 16.8464 17.8444C16.8464 18.3095 17.2235 18.6866 17.6887 18.6866Z"
                  stroke="#A7A7A7"
                  strokeWidth="1.60013"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.68652 1H5.05539L7.31254 12.2773C7.38955 12.665 7.6005 13.0134 7.90844 13.2613C8.21639 13.5092 8.60172 13.6408 8.99697 13.6333H17.1833C17.5786 13.6408 17.9639 13.5092 18.2719 13.2613C18.5798 13.0134 18.7907 12.665 18.8678 12.2773L20.2153 5.21109H5.89761"
                  stroke="#A7A7A7"
                  strokeWidth="1.60013"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span className="header__cart-count">{cartTotalCount}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
