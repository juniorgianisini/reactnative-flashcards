import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "DECKS_STORAGE_KEY";
export const CARDS_STORAGE_KEY = "CARDS_STORAGE_KEY";

const dummyDecks = [
    {
        id: "dummydeck01",
        name: "Udacity Cards",
        cards: ["dummycard01", "dummycard02"]
    },
    {
        id: "dummydeck02",
        name: "Java Cards",
        cards: ["dummycard03"]
    },
    {
        id: "dummydeck03",
        name: "React Cards",
        cards: []
    }
];

const dummyCards = [
    {
        id: "dummycard01",
        deckId: "dummydeck01",
        question: "Does React Native work with Android?",
        answer: "Yes"
    },
    {
        id: "dummycard02",
        deckId: "dummydeck01",
        question: "What is a component?",
        answer: "Component let you split UI into independent, reusable pieces."
    },
    {
        id: "dummycard03",
        deckId: "dummydeck02",
        question: "What is a JVM?",
        answer: "JVM is a Virtual Machine."
    }
];

/**
 * Retornar lista de baralhos de AsyncStorage
 */
export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
        if (result && result !== "{}") {
            return JSON.parse(result);
        } else {
            const dummyDecks = getDummyDecks();
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyDecks));
            return dummyDecks;
        }
    });
}

/**
 * Retornar lista de cartas 'questões' de AsyncStorage
 */
export function fetchCards() {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(result => {
        if (result && result !== "{}") {
            return JSON.parse(result);
        } else {
            const dummyCards = getDummyCards();
            AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(dummyCards));
            return dummyCards;
        }
    });
}

/**
 * Gravar no AsyncStorage mudanças realizadas em um determinado baralho
 * 
 * @param {Object} deck 
 */
export function persistDeck(deck) {
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [deck.id]: deck
        })
    );
}

/**
 * 
 * Gravar no AsyncStorage mudanças realizadas em uma determinada questão
 * 
 * @param {Object} deck 
 * @param {Object} card 
 */
export function persistCard(deck, card) {
    const deck_ = { ...deck, cards: deck.cards.concat([card.id]) };
    let multiMerge = [
        [DECKS_STORAGE_KEY, JSON.stringify({ [deck_.id]: deck_ })],
        [CARDS_STORAGE_KEY, JSON.stringify({ [card.id]: card })]
    ];
    return AsyncStorage.multiMerge(multiMerge);
}

/**
 * Retornar lista fixa de baralhos para inicialização do App
 */
function getDummyDecks() {
    return dummyDecks.reduce(function(map, deck) {
        map[deck.id] = deck;
        return map;
    }, {});
}

/**
 * Retornar lista fixa de cartas para inicialização do App
 */
function getDummyCards() {
    return dummyCards.reduce(function(map, card) {
        map[card.id] = card;
        return map;
    }, {});
}
  