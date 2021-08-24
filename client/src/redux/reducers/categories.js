import produce from 'immer'

const initialState = {
  items: [],
  isLoaded: false,
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_LOADED':
      return produce(state, draft => {
        draft.isLoaded = action.payload
      })
    case 'SET_CATEGORIES':
      return produce(state, draft => {
        draft.items = action.payload
        draft.isLoaded = true
      })
    default:
      return state
  }
}

export default categories
