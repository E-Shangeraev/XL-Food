/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux'
import Categories from '../components/Categories/Categories'
import ProductsBlock from '../components/ProductsBlock/ProductsBlock'
import Showreel from '../components/Showreel/Showreel'

const Home = () => {
  const { items: categoriesItems, isLoaded: categoriesIsLoaded } = useSelector(
    ({ categories }) => categories,
  )
  const { items: productsItems, isLoaded: productsIsLoaded } = useSelector(
    ({ products }) => products,
  )

  return (
    <main className="main">
      <h1 className="visually-hidden">Главная страница XL Food</h1>
      {categoriesIsLoaded && <Categories />}
      <div className="main__container">
        <Showreel />
        {productsIsLoaded &&
          categoriesIsLoaded &&
          categoriesItems.map(category => (
            <ProductsBlock
              id={category.index}
              title={category.name}
              key={category._id}
              items={productsItems.filter(
                product => product.category.index === category.index,
              )}
            />
          ))}
      </div>
    </main>
  )
}

export default Home
