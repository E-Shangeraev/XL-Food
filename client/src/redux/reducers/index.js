import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'
import cart from './cart'
import recommended from './recommended'
import activeSection from './activeSection'
import showreel from './showreel'

const rootReducer = combineReducers({
  categories,
  products,
  cart,
  recommended,
  activeSection,
  showreel,
})

export default rootReducer
