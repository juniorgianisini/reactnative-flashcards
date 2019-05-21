import { fetchDecks, addDeck } from "../utils/api";
import UUID from "uuid";

export const GET_ALL_DECKS = "GET_ALL_DECKS"
export const NEW_DECK = "NEW_DECK"

export function getAllDecks(decks){
    return {
        type: GET_ALL_DECKS,
        decks: decks
    }
}

export function newDeck(deck) {
    return {
        type: NEW_DECK,
        deck: deck
    }
}

export function handleGetAllDecks(){
    return dispatch => {
        return fetchDecks().then(decks => dispatch(getAllDecks(decks)))
    }
}

export function handleNewDeck(deck) {
    deck.id = UUID()
    return dispatch => {
        return addDeck(deck, deck.id).then(() => dispatch(newDeck(deck)))
    }
}