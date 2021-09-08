/* eslint-disable no-unused-expressions */
import produce from 'immer'

const initialState = {
  items: {},
  totalPrice: 0,
  totalPriceWithDiscount: 0,
  totalCount: 0,
  promoCodeIsValid: false,
  isPickup: false,
}

const PROMOCODE_DISCOUNT = 0.1
const PICKUP_DISCOUNT = 0.15

const getTotalPrice = items =>
  Object.keys(items).reduce((sum, key) => items[key].totalPrice + sum, 0)

const getTotalCount = items =>
  Object.keys(items).reduce((sum, key) => items[key].count + sum, 0)

const getTotalPriceWithDiscount = (totalPrice, state = initialState) => {
  let DISCOUNT = 0

  if (state.promoCodeIsValid) DISCOUNT += PROMOCODE_DISCOUNT
  if (state.isPickup) DISCOUNT += PICKUP_DISCOUNT

  return totalPrice * (1 - DISCOUNT)
}

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
        draft.totalPriceWithDiscount = getTotalPriceWithDiscount(
          draft.totalPrice,
          draft,
        )
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
        draft.totalPriceWithDiscount = getTotalPriceWithDiscount(
          draft.totalPrice,
          draft,
        )
        draft.totalCount = getTotalCount(draft.items)
      })
    }
    case 'REMOVE_CART_ITEM': {
      const id = action.payload

      return produce(state, draft => {
        delete draft.items[id]
        draft.totalPrice = getTotalPrice(draft.items)
        draft.totalPriceWithDiscount = getTotalPriceWithDiscount(
          draft.totalPrice,
          draft,
        )
        draft.totalCount = getTotalCount(draft.items)
      })
    }
    case 'CLEAR_CART': {
      return produce(state, draft => {
        draft.items = {}
        draft.totalPrice = 0
        draft.totalPriceWithDiscount = 0
        draft.totalCount = 0
        delete draft.promoCodeIsValid
      })
    }
    case 'ACTIVATE_PROMOCODE': {
      return produce(state, draft => {
        draft.promoCodeIsValid = action.payload
        draft.totalPriceWithDiscount = getTotalPriceWithDiscount(
          draft.totalPrice,
          draft,
        )
      })
    }
    case 'SET_TYPE_PICKUP': {
      return produce(state, draft => {
        draft.isPickup = action.payload
        draft.totalPriceWithDiscount = getTotalPriceWithDiscount(
          draft.totalPrice,
          draft,
        )
      })
    }
    default:
      return state
  }
}

export default cart
