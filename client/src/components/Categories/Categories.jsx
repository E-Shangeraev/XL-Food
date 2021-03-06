import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import './Categories.scss'

const Categories = () => {
  const [active, setActive] = useState(0)
  const { items: categoryItems, isLoaded } = useSelector(
    ({ categories }) => categories,
  )
  const activeId = useSelector(({ activeSection }) => activeSection.id)
  const categoriesRef = useRef()

  useEffect(() => {
    setActive(activeId)
  }, [activeId])

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

export default Categories
