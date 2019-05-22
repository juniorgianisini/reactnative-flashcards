import { fetchDecks, fetchCards, addDeck, addCard } from "../utils/api";
import UUID from "uuid";

export const GET_ALL_DECKS = "GET_ALL_DECKS"
export const GET_ALL_CARDS = "GET_ALL_CARDS"
export const NEW_DECK = "NEW_DECK"
export const NEW_CARD = "NEW_CARD"

export function getAllDecks(decks){
    return {
        type: GET_ALL_DECKS,
        decks: decks
    }
}

export function getAllCards(cards){
    return {
        type: GET_ALL_CARDS,
        cards: cards
    }
}

export function newDeck(deck) {
    return {
        type: NEW_DECK,
        deck: deck
    }
}

export function newCard(card) {
    return {
        type: NEW_CARD,
        card: card
    }
}

export function handleGetAllDecks(){
    return dispatch => {
        return fetchDecks().then(decks => dispatch(getAllDecks(decks)))
    }
}

export function handleGetAllCards(){
    return dispatch => {
        return fetchCards().then(cards => dispatch(getAllCards(cards)))
    }
}

export function handleNewDeck(deck) {
    deck.id = UUID()
    deck.cards = []
    return dispatch => {
        return addDeck(deck).then(() => dispatch(newDeck(deck)))
    }
}

export function handleNewCard(deck, card) {
    card.id = UUID()
    card.deckId = deck.id
    return dispatch => {
        return addCard(deck, card).then(() => dispatch(newCard(card)))
    }
}