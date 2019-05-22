import React from "react";
import { StyleSheet } from "react-native";
import { Text, Card, CardItem, Body } from "native-base";

export const QuizCard = ({ card, children, style = {}, onPressCard, cardMode }) => (
    <Card {...cardMode}>
        <CardItem>
            <Body style={[styles.card, style]}>
                <Text style={styles.textCard}>{card.question}</Text>
                <Text>{card.answer}</Text>
                {children}
            </Body>
        </CardItem>
    </Card>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textCard: {
        fontSize: 30
    }
});
