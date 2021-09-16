import produce from 'immer'

const initialState = {
  content: null,
  isLoaded: false,
}

const showreel = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOWREEL_LOADED':
      return produce(state, draft => {
        draft.isLoaded = action.payload
      })
    case 'SET_SHOWREEL':
      return produce(state, draft => {
        draft.content = action.payload
        draft.isLoaded = true
      })
    default:
      return state
  }
}

export default showreel
