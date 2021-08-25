import { useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import fetchCategories from './redux/actions/categories'
import fetchProducts from './redux/actions/products'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Cart from './pages/cart/Cart'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
