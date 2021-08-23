import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'

const rootReducer = combineReducers({
  categories,
  products,
})

export default rootReducer
