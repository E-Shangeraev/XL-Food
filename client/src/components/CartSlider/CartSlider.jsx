/* eslint-disable no-underscore-dangle */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slick from 'react-slick'
import { v4 as uuidv4 } from 'uuid'
import fetchRecommended from '../../redux/actions/recommended'
import Button from '../Button/Button'
import RecommendedItem from '../RecommendedItem/RecommendedItem'

import './CartSlider.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const CartSlider = () => {
  const dispatch = useDispatch()
  const totalCount = useSelector(({ cart }) => cart.totalCount)
  const { items: recommendedItems, isLoaded } = useSelector(
    ({ recommended }) => recommended,
  )
  const cartSliderRef = useRef(null)

  useEffect(() => {
    dispatch(fetchRecommended(totalCount))
  }, [])

  const next = () => {
    if (cartSliderRef.current !== null) {
      cartSliderRef.current.slickNext()
    }
  }
  const prev = () => {
    if (cartSliderRef.current !== null) {
      cartSliderRef.current.slickPrev()
    }
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipe: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="cart-slider">
      {isLoaded && (
        <>
          <Button
            style={{
              color: '#fff',
              borderRadius: '8px',
              backgroundColor: 'rgba(167, 167, 167, 0.19)',
            }}
            hover={{
              color: '#E9D735',
              backgroundColor: 'rgba(233, 215, 53, 0.2)',
            }}
            onClick={prev}>
            {'<'}
          </Button>
          <Slick {...settings} ref={cartSliderRef}>
            {recommendedItems.map(item => (
              <RecommendedItem
                key={uuidv4()}
                id={item._id}
                name={item.name}
                image={
                  item.uploadedFile &&
                  item.uploadedFile.path &&
                  `${AWS_URL}${item.uploadedFile.path}`
                }
                price={item.cost}
              />
            ))}
          </Slick>
          <Button
            style={{
              color: '#fff',
              borderRadius: '8px',
              backgroundColor: 'rgba(167, 167, 167, 0.19)',
            }}
            hover={{
              color: '#E9D735',
              backgroundColor: 'rgba(233, 215, 53, 0.2)',
            }}
            onClick={next}>
            {'>'}
          </Button>
        </>
      )}
    </div>
  )
}

export default CartSlider
