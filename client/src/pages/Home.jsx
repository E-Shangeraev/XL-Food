import Categories from '../components/Categories/Categories'
import ProductsBlock from '../components/ProductsBlock/ProductsBlock'

const Home = () => (
  <main className="main">
    <h1 className="visually-hidden">Главная страница XL Food</h1>
    <Categories />
    <div className="main__container">
      <section className="showreal">
        <div className="showreal__block" />
      </section>
      <ProductsBlock id={1} title="Бургеры" />
      <ProductsBlock id={2} title="Пиццы" />
      <ProductsBlock id={3} title="Роллы" />
      <ProductsBlock id={4} title="Десерты" />
    </div>
  </main>
)

export default Home
