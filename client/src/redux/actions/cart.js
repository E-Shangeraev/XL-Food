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

export const activatePromocode = bool => ({
  type: 'ACTIVATE_PROMOCODE',
  payload: bool,
})

const promocodeLoading = bool => ({
  type: 'PROMOCODE_LOADING',
  payload: bool,
})

export const checkPromocode = promocode => dispatch => {
  dispatch(promocodeLoading(true))
  try {
    fetch('/api/cart/check_promocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ promocode }),
    }).then(response => {
      dispatch(activatePromocode(response.ok))
      dispatch(promocodeLoading(false))
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const setTypePickup = bool => ({
  type: 'SET_TYPE_PICKUP',
  payload: bool,
})
