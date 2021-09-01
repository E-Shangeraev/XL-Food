import produce from 'immer'

const initialState = {
  id: 0,
}

const activeSection = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION_ID':
      return produce(state, draft => {
        draft.id = action.payload
      })
    default:
      return state
  }
}

export default activeSection
