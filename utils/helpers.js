import UUID from "uuid";
import { Notifications, Permissions } from "expo";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "FlashCards:notifications";

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

export function createCard(deckId, question, answer) {
    return {
        id: UUID(),
        deckId,
        question,
        answer
    };
}

export function createResultQuiz(deckId, result) {
    return {
        id: UUID(),
        deckId,
        result,
        data: getDateWithoutTime(new Date())
    };
}

export function getDateWithoutTime(data) {
    var d = new Date(data);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function generateTextByScoreQuiz(scorePerc) {
    return `Correct answers: ${scorePerc}%`;
}

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

export function calculateScoreQuiz(correctCount, totalCards) {
    return Math.round((correctCount * 100) / totalCards);
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

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

export function formatDate(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString("en-US");
    return d.toLocaleDateString() + " at " + time.substr(0, 5) + time.slice(-2);
}
