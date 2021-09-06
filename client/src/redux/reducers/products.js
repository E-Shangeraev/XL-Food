import produce from 'immer'

const initialState = {
  items: [],
  isLoaded: false,
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADED':
      return produce(state, draft => {
        draft.isLoaded = action.payload
      })
    case 'SET_PRODUCTS':
      return produce(state, draft => {
        draft.items = [...state.items, ...action.payload]
        draft.isLoaded = true
      })
    default:
      return state
  }
}

export default products
