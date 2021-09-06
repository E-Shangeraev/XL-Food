const categoriesLoaded = payload => ({
  type: 'CATEGORIES_LOADED',
  payload,
})

const setCategories = payload => ({
  type: 'SET_CATEGORIES',
  payload,
})

const fetchCategories = () => async dispatch => {
  try {
    dispatch(categoriesLoaded(false))

    const items = await fetch('/api/categories').then(response =>
      response.json(),
    )

    dispatch(setCategories(items))
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchCategories
