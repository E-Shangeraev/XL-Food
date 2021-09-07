const recomendedLoaded = payload => ({
  type: 'RECOMMENDED_LOADED',
  payload,
})

const setRecommended = payload => ({
  type: 'SET_RECOMMENDED',
  payload,
})

const fetchRecommended = count => async dispatch => {
  try {
    dispatch(recomendedLoaded(false))

    const items = await fetch(`/api/products/recommended?count=${count}`).then(
      response => response.json(),
    )

    dispatch(setRecommended(items))
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchRecommended
