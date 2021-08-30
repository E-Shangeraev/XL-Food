/* eslint-disable no-unused-expressions */
import produce from 'immer'

const initialState = {
  items: {},
  totalPrice: 0,
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0)

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id, name, image, price } = action.payload
      const currentItem = !state.items[id]
        ? { name, image, price, count: 1 }
        : {
            ...state.items[id],
            count: state.items[id].count + 1,
            price: state.items[id].price + price,
          }

      const newItems = {
        ...state.items,
        [id]: currentItem,
      }

      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].price + sum,
        0,
      )

      return {
        ...state,
        items: newItems,
        totalPrice,
      }
    }

    case 'MINUS_CART_ITEM': {
      const { id, price } = action.payload
      const oldItem = state.items[id]
      const currentItem =
        oldItem.count > 0
          ? {
              ...oldItem,
              count: oldItem.count - 1,
              price: oldItem.price - price,
            }
          : { ...oldItem, count: 0, price: 0 }

      const newItems = {
        ...state.items,
        [id]: currentItem,
      }

      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].price + sum,
        0,
      )

      return produce(state, draft => {
        if (currentItem.count > 0) {
          delete draft.items[id]
        }
        if (currentItem.count === 0) {
          draft.items[id] = currentItem
        }
        draft.totalPrice = totalPrice
      })
    }

    default:
      return state
  }
}

export default cart
