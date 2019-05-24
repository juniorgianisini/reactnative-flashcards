import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, Card, CardItem, Body, View } from "native-base";

class Deck extends Component {
    state = {
        bounceValue: new Animated.Value(1)
    };

    onPressAnimation = () => {
        const { bounceValue } = this.state;
        const { onPressDeck } = this.props;

        /*Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start(() => {
            onPressDeck();
        });*/

        onPressDeck();
    };

    render() {
        const {
            deck,
            children,
            style = {},
            onPressDeck,
            cardMode
        } = this.props;

        const { bounceValue } = this.state;
        const cardLen = deck.cards.length;

        return (
            <View
                style={styles.deckMain}
            >
                <Card {...cardMode}>
                    <CardItem
                        button={onPressDeck ? true : false}
                        onPress={this.onPressAnimation}
                    >
                        <Body style={[styles.deckBody, style]}>
                            <Animated.Text
                                style={[
                                    styles.deckText,
                                    { transform: [{ scale: bounceValue }] }
                                ]}
                            >
                                {deck.name}
                            </Animated.Text>
                            <Text>
                                {cardLen} card{cardLen > 1 && "s"}
                            </Text>
                            {children}
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deckMain: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
        marginTop: 5
    },
    deckBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    deckText: {
        fontSize: 30,
        textAlign: 'center'
    }
});

export default Deck;
