import { combineReducers } from "redux";
import { GET_ALL_DECKS, NEW_DECK, GET_ALL_CARDS, NEW_CARD } from "../actions";

function decks(state = {}, action) {
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case NEW_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            };
        case NEW_CARD:
            return {
                ...state,
                [action.card.deckId]: {
                    ...state[action.card.deckId],
                    cards: state[action.card.deckId].cards.concat([
                        action.card.id
                    ])
                }
            };
        default:
            return state;
    }
}

function cards(state = {}, action) {
    switch (action.type) {
        case GET_ALL_CARDS:
            return {
                ...state,
                ...action.cards
            };
        case NEW_CARD:
            return {
                ...state,
                [action.card.id]: action.card
            };
        default:
            return state;
    }
}

export default combineReducers({
    decks,
    cards
});
