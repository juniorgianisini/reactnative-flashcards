import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, Card, CardItem, Body } from "native-base";

class Deck extends Component {
    state = {
        bounceValue: new Animated.Value(1)
    };

    onPressAnimation = () => {
        const { bounceValue } = this.state
        const { onPressDeck } = this.props

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start(() => {
            onPressDeck()
        });
    };

    render() {
        const {
            deck,
            children,
            style = {},
            onPressDeck,
            cardMode
        } = this.props;

        const {bounceValue} = this.state 

        return (
            <Card {...cardMode}>
                <CardItem button={onPressDeck ? true : false} onPress={this.onPressAnimation}>
                    <Body style={[styles.deck, style]}>
                        <Animated.Text style={[styles.textDeck, {transform: [{scale: bounceValue}]}]}>{deck.name}</Animated.Text>
                        <Text>{deck.cards.length} card</Text>
                        {children}
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

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

export default Deck
