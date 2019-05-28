import { fetchDecks, fetchCards, persistDeck, persistCard } from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const GET_ALL_CARDS = "GET_ALL_CARDS";
export const NEW_DECK = "NEW_DECK";
export const CHANGE_STATS_DECK = "CHANGE_STATS_DECK";
export const NEW_CARD = "NEW_CARD";

export function getAllDecksAction(decks) {
    return {
        type: GET_ALL_DECKS,
        decks: decks
    };
}

export function getAllCardsAction(cards) {
    return {
        type: GET_ALL_CARDS,
        cards: cards
    };
}

export function newDeckAction(deck) {
    return {
        type: NEW_DECK,
        deck: deck
    };
}

export function changeStatsDeckAction(deck) {
    return {
        type: CHANGE_STATS_DECK,
        deck: deck
    };
}

export function newCardAction(card) {
    return {
        type: NEW_CARD,
        card: card
    };
}

export function handleGetAllDecks() {
    return dispatch => {
        return fetchDecks().then(decks => dispatch(getAllDecksAction(decks)));
    };
}

export function handleGetAllCards() {
    return dispatch => {
        return fetchCards().then(cards => dispatch(getAllCardsAction(cards)));
    };
}

export function handleNewDeck(deck) {
    return dispatch => {
        return persistDeck(deck).then(() => dispatch(newDeckAction(deck)));
    };
}

export function handleNewCard(deck, card) {
    return dispatch => {
        return persistCard(deck, card).then(() =>
            dispatch(newCardAction(card))
        );
    };
}

export function handleResultQuiz(deck, result) {
    let { statsQuiz } = deck;
    if (!statsQuiz || !statsQuiz.minor || !statsQuiz.major) {
        statsQuiz = { minor: 0, major: 0, lastDate: new Date() };
        deck.statsQuiz = statsQuiz
    }

    if (statsQuiz.minor === 0 || result < statsQuiz.minor) {
        statsQuiz.minor = result;
    }
    if (statsQuiz.major === 0 || result > statsQuiz.major) {
        statsQuiz.major = result;
    }
    statsQuiz.lastDate = new Date();

    return dispatch => {
        return persistDeck(deck).then(() =>
            dispatch(changeStatsDeckAction(deck))
        );
    };
}
