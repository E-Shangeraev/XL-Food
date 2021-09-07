import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'
import cart from './cart'
import recommended from './recommended'
import activeSection from './activeSection'

const rootReducer = combineReducers({
  categories,
  products,
  cart,
  recommended,
  activeSection,
})

export default rootReducer
