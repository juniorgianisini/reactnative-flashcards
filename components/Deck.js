import React from "react";
import { StyleSheet } from "react-native";
import { Text, Card, CardItem, Body, View } from "native-base";

export const Deck = ({ deck, children, style = {}, onPressDeck, cardMode }) => (
    <Card {...cardMode}>
        <CardItem button onPress={onPressDeck}>
            <Body style={[styles.deck, style]}>
                <Text style={styles.textDeck}>{deck.name}</Text>
                <Text>{deck.cards.length} card</Text>
                {children}
            </Body>
        </CardItem>
    </Card>
);

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textDeck: {
        fontSize: 30
    }
});
