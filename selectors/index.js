export const getAllDecksSelector = (state) => {
    return state.decks ? Object.keys(state.decks).map(key => state.decks[key]) : []
}