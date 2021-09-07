export const addToCart = obj => ({
  type: 'ADD_TO_CART',
  payload: obj,
})

export const minusCartItem = id => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
})

export const removeCartItem = id => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
})

export const clearCart = () => ({
  type: 'CLEAR_CART',
})
