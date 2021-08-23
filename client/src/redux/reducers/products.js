const initialState = {
  items: [],
  isLoaded: false,
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isLoaded: true,
      }
    default:
      return state
  }
}

export default products
