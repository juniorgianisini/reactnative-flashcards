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

export function generateTextByScoreQuiz(scorePerc) {
    return `Correct answers: ${scorePerc}%`
}

export function generateEmojiByScoreQuiz(scorePerc) {
    if(scorePerc >= 70){
        return `😃 Congrats, Keep it up!`
    }else if(scorePerc >= 50){
        return `🙂 Good Job!`
    }else{
        return `😬 Don’t give up!`
    }
    return `Correct Answers: ${scorePerc}% ${scorePerc > 70 ? '😃' : scorePerc > 50 ? '🙂' : '😬'}`
}

export function calculateScoreQuiz(correctCount, totalCards) {
    return Math.round((correctCount * 100) / totalCards);
}