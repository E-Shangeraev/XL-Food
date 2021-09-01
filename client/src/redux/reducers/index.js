import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'
import cart from './cart'
import activeSection from './activeSection'

const rootReducer = combineReducers({
  categories,
  products,
  cart,
  activeSection,
})

export default rootReducer
