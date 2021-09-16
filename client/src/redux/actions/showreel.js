export const showreelLoaded = payload => ({
  type: 'SHOWREEL_LOADED',
  payload,
})

const setShowreel = payload => ({
  type: 'SET_SHOWREEL',
  payload,
})

const fetchShowreel = () => dispatch => {
  try {
    dispatch(showreelLoaded(false))
    fetch('/api/showreel')
      .then(response => response.json())
      .then(data => dispatch(setShowreel(data)))
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchShowreel
