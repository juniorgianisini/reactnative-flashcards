import UUID from "uuid";

export function createteDeck(name){
    return { 
        id: UUID(),
        cards: [],
        name
    }
    
}

export function createCard(deckId, question, answer){
    return {
        id: UUID(),
        deckId,
        question,
        answer
    }
}