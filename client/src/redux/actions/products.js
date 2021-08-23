const productsLoaded = payload => ({
  type: 'PRODUCTS_LOADED',
  payload,
})

const setProducts = payload => ({
  type: 'SET_PRODUCTS',
  payload,
})

const fetchCategories = category => async dispatch => {
  dispatch(productsLoaded(false))

  const items = await fetch(`/api/products/${category}`).then(response =>
    response.json(),
  )

  dispatch(setProducts(items))
}

export default fetchCategories
