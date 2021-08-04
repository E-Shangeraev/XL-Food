import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'

const App = () => (
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

export default App
