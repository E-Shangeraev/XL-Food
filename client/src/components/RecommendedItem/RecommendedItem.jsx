import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addToCart } from '../../redux/actions/cart'
import Button from '../Button/Button'
import noImage from '../../assets/img/no_image.jpg'

import './RecommendedItem.scss'

const RecommendedItem = ({ id, name, image, price }) => {
  const dispatch = useDispatch()

  const handlePlusClick = () => {
    dispatch(addToCart({ id, name, image, price }))
  }

  return (
    <div className="cart-slider__slide recommended-item">
      {image ? (
        <img className="recommended-item__image" src={image} alt={name} />
      ) : (
        <img className="recommended-item__image" src={noImage} alt={name} />
      )}
      <div>
        <span className="recommended-item__name">{name}</span>
        <div className="recommended-item__bottom">
          <b className="recommended-item__price">
            {price.toLocaleString('ru-RU')} ₽
          </b>
          <div className="product__counter">
            <Button
              style={{
                minWidth: '25px',
                minHeight: '25px',
                color: '#fff',
                border: '1px solid rgba(233, 215, 53, 0.6)',
                borderRadius: '8px',
                backgroundColor: 'rgba(233, 215, 53, 0.6)',
              }}
              hover={{
                boxShadow: '0 0 5px rgba(233, 215, 53, 0.6)',
              }}
              onClick={handlePlusClick}>
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

RecommendedItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
}

RecommendedItem.defaultProps = {
  image: null,
}

export default RecommendedItem
