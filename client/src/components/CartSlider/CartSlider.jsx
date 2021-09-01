import { useRef } from 'react'
import Slick from 'react-slick'
import Button from '../Button/Button'

import './CartSlider.scss'

const CartSlider = () => {
  const cartSliderRef = useRef(null)

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
  }

  return (
    <div className="cart-slider">
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
        <div className="cart_slider__slide">
          <h3>1</h3>
        </div>
        <div className="cart_slider__slide">
          <h3>2</h3>
        </div>
        <div className="cart_slider__slide">
          <h3>3</h3>
        </div>
        <div className="cart_slider__slide">
          <h3>4</h3>
        </div>
        <div className="cart_slider__slide">
          <h3>5</h3>
        </div>
        <div className="cart_slider__slide">
          <h3>6</h3>
        </div>
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
    </div>
  )
}

export default CartSlider
