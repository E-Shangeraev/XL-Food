import produce from 'immer'

const initialState = {
  items: [],
  isLoaded: false,
}

const recommended = (state = initialState, action) => {
  switch (action.type) {
    case 'RECOMMENDED_LOADED':
      return produce(state, draft => {
        draft.isLoaded = action.payload
      })
    case 'SET_RECOMMENDED':
      return produce(state, draft => {
        draft.items = action.payload
        draft.isLoaded = true
      })
    default:
      return state
  }
}

export default recommended
