export const getAllDecksSelector = (state) => {
    return state.decks ? Object.keys(state.decks).map(key => state.decks[key]) : []
}

export const getDeckById = (state, deckId) => {
    return state.decks[deckId]
}

export const getCardsByDeckId = (state, deckId) => {
    return state.decks[deckId].cards.map((cardId) => state.cards[cardId])
}