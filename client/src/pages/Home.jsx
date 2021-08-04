import Categories from '../components/Categories/Categories'
import ProductsBlock from '../components/ProductsBlock/ProductsBlock'

const Home = () => (
  <main className="main">
    <h1 className="visually-hidden">Главная страница XL Food</h1>
    <Categories />
    <div className="showreal" />
    <ProductsBlock />
  </main>
)

export default Home
