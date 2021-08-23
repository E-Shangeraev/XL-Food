const initialState = {
  items: [],
  isLoaded: false,
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      }
    case 'SET_CATEGORIES':
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isLoaded: true,
      }
    default:
      return state
  }
}

export default categories
