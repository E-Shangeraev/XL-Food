import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'
import successfulIcon from '../../assets/img/successful.svg'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(-50%)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 1, transform: 'translateY(-50%)' },
  exited: { opacity: 0, transform: 'translateY(-100%)' },
}

const CartSuccessful = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <section
        className="cart cart--successful"
        style={{ ...defaultStyle, ...transitionStyles[state] }}>
        <img src={successfulIcon} alt="Данные успешно отправлены" />
        <h2 className="cart__title">
          Спасибо за заказ! <br />
          Данные успешно отправлены.
        </h2>
      </section>
    )}
  </Transition>
)

CartSuccessful.propTypes = {
  in: PropTypes.bool.isRequired,
}

export default CartSuccessful
