import UUID from "uuid";
import { Notifications, Permissions } from "expo";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "FlashCards:notifications";

/**
 * Criar um objeto de baralho
 * 
 * @param {String} name 
 */
export function createteDeck(name) {
    return {
        id: UUID(),
        cards: [],
        name,
        statsQuiz: {
            minor: 0,
            major: 0,
            lastDate: new Date()
        }
    };
}

/**
 * Criar um objeto de carta.
 * 
 * @param {String} deckId 
 * @param {String} question 
 * @param {String} answer 
 */
export function createCard(deckId, question, answer) {
    return {
        id: UUID(),
        deckId,
        question,
        answer
    };
}

/**
 * Criar um texto para apresentação do resultado do Quiz
 * 
 * @param {Number} scorePerc: Percentual de acertos no Quiz
 */
export function generateTextByScoreQuiz(scorePerc) {
    return `Correct answers: ${scorePerc}%`;
}

/**
 * Criar um texto amigável 'motivacional' para apresentação do resultado do Quiz
 * 
 * @param {Number} scorePerc: Percentual de acertos no Quiz
 */
export function generateEmojiByScoreQuiz(scorePerc) {
    if (scorePerc >= 70) {
        return `😃 Congrats, Keep it up!`;
    } else if (scorePerc >= 50) {
        return `🙂 Good Job!`;
    } else {
        return `😬 Don’t give up!`;
    }
    return `Correct Answers: ${scorePerc}% ${
        scorePerc > 70 ? "😃" : scorePerc > 50 ? "🙂" : "😬"
    }`;
}

/**
 * Calcular resultado do Quiz
 * 
 * @param {Number} correctCount: Número de acertos
 * @param {Number} totalCards: Total de cartas 'questões' no Baralho
 */
export function calculateScoreQuiz(correctCount, totalCards) {
    return Math.round((correctCount * 100) / totalCards);
}

/**
 * Limpar notificação pendente
 */
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

/**
 * Criar objeto de notificação
 */
function createNotification() {
    return {
        title: "Daily Quiz!",
        body: "👋 Don`t forget to take your quiz today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}

/**
 * Definir notificação para ser apresentada no próximo dia as 21 hrs.
 */
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate()+1);
                            tomorrow.setHours(21);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: "day"
                                }
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
}

/**
 * Formatar data
 * 
 * @param {Date} timestamp 
 */
export function formatDate(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString("en-US");
    return d.toLocaleDateString() + " at " + time.substr(0, 5) + time.slice(-2);
}
