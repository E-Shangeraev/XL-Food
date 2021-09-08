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

const activatePromocode = bool => ({
  type: 'ACTIVATE_PROMOCODE',
  payload: bool,
})

export const checkPromocode = promocode => dispatch => {
  try {
    fetch('/api/cart/check_promocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ promocode }),
    }).then(response => dispatch(activatePromocode(response.ok)))
  } catch (error) {
    throw new Error(error.message)
  }
}

export const setTypePickup = bool => ({
  type: 'SET_TYPE_PICKUP',
  payload: bool,
})
