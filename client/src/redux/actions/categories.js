const categoriesLoaded = payload => ({
  type: 'CATEGORIES_LOADED',
  payload,
})

const setCategories = payload => ({
  type: 'SET_CATEGORIES',
  payload,
})

const fetchCategories = () => async dispatch => {
  dispatch(categoriesLoaded(false))

  const items = await fetch('/api/categories').then(response => response.json())

  dispatch(setCategories(items))
}

export default fetchCategories
