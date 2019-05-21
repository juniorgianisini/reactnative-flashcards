import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "DECKS_STORAGE_KEY";

const dummyDecks = [
    {
        id: "dummydeck01",
        name: "Udacity Cards",
        countCards: 3
    },
    {
        id: "dummydeck02",
        name: "Java Cards",
        countCards: 2
    },
    {
        id: "dummydeck03",
        name: "React Cards",
        countCards: 5
    }
];

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
        (result) => {
            console.log('RESULT', result)
            if(result){
                return JSON.parse(result)
            }else{
                return getDummyDecks()
            }
        });
}

export function addDeck ({ deck, key }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }))
  }

function getDummyDecks() {
    return dummyDecks.reduce(function(map, deck) {
        map[deck.id] = deck;
        return map;
    }, {});
}
