import { fetchDecks } from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS"

export function getAllDecks(decks){
    return {
        type: GET_ALL_DECKS,
        decks: decks
    }
}

export function handleGetAllDecks(){
    return dispatch => {
        return fetchDecks().then(decks => dispatch(getAllDecks(decks)))
    }
}