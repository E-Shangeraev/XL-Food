/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchCategories from '../redux/actions/categories'
import Categories from '../components/Categories/Categories'
import ProductsBlock from '../components/ProductsBlock/ProductsBlock'

const Home = () => {
  const dispatch = useDispatch()
  const { items: categoriesItems, isLoaded } = useSelector(
    ({ categories }) => categories,
  )

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <main className="main">
      <h1 className="visually-hidden">Главная страница XL Food</h1>
      <Categories />
      <div className="main__container">
        <section className="showreal">
          <div className="showreal__block" />
        </section>
        {isLoaded &&
          categoriesItems.map(category => (
            <ProductsBlock
              id={category.index}
              title={category.name}
              key={category._id}
            />
          ))}
      </div>
    </main>
  )
}

export default Home
