/* eslint-disable no-unused-expressions */
import produce from 'immer'

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
}

const getTotalPrice = items =>
  Object.keys(items).reduce((sum, key) => items[key].totalPrice + sum, 0)
const getTotalCount = items =>
  Object.keys(items).reduce((sum, key) => items[key].count + sum, 0)

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id, name, image, price } = action.payload

      return produce(state, draft => {
        if (!state.items[id]) {
          draft.items[id] = { name, image, price, totalPrice: price, count: 1 }
        } else {
          draft.items[id].count = state.items[id].count + 1
          draft.items[id].totalPrice =
            state.items[id].totalPrice + state.items[id].price
        }

        draft.totalPrice = getTotalPrice(draft.items)
        draft.totalCount = getTotalCount(draft.items)
      })
    }
    case 'MINUS_CART_ITEM': {
      const id = action.payload

      return produce(state, draft => {
        if (state.items[id].count > 1) {
          draft.items[id].count = state.items[id].count - 1
          draft.items[id].totalPrice =
            state.items[id].totalPrice - state.items[id].price
        } else {
          delete draft.items[id]
        }
        draft.totalPrice = getTotalPrice(draft.items)
        draft.totalCount = getTotalCount(draft.items)
      })
    }
    case 'REMOVE_CART_ITEM': {
      const id = action.payload

      return produce(state, draft => {
        delete draft.items[id]
        draft.totalPrice = getTotalPrice(draft.items)
        draft.totalCount = getTotalCount(draft.items)
      })
    }
    default:
      return state
  }
}

export default cart
