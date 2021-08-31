import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Categories.scss'

const Categories = ({ inView }) => {
  const [active, setActive] = useState(1)
  const { items: categoryItems, isLoaded } = useSelector(
    ({ categories }) => categories,
  )
  const categoriesRef = useRef()
  const { hash } = useLocation()

  useEffect(() => {
    const index = hash.replace('#', '')
    setActive(index)
    setActive(inView)
    // console.log(inView)
    // window.addEventListener('scroll', () => {
    //   setTimeout(() => {
    //     console.log(
    //       categoriesRef.current.getBoundingClientRect().
    // bottom + window.scrollY,
    //     )
    //   }, 50000)
    // })
    // // console.log(window.pageYOffset)
  }, [hash, inView])

  return (
    <div className="categories" ref={categoriesRef}>
      <ul className="categories__list">
        {isLoaded &&
          categoryItems.map(category => (
            <li
              key={uuidv4()}
              className={classNames({ 'active': +active === category.index })}>
              <a href={`#${category.index}`}>{category.name}</a>
            </li>
          ))}
      </ul>
    </div>
  )
}

Categories.propTypes = {
  inView: PropTypes.number.isRequired,
}

export default Categories
