import { combineReducers } from "redux";
import { GET_ALL_DECKS, NEW_DECK } from "../actions";

function decks(state = {}, action){
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case NEW_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            }
        default:
            return state
    }
}

export default combineReducers({
    decks
})