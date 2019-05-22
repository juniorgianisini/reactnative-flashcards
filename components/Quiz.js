import React, { Component } from "react";
import {
    Container,
    DeckSwiper,
    Content,
    View,
    Card,
    CardItem,
    Text,
    Button,
    Icon
} from "native-base";
import { connect } from "react-redux";
import { getCardsByDeckId, getDeckById } from "./../selectors/index";
import CustomHeader from "./CustomHeader";
import { QuizCard } from "./QuizCard";

class Quiz extends Component {
    render() {
        const { cards, deck, navigation } = this.props;
        console.log("CARDSSSSSSSSSS", cards);
        return (
            <Container>
                <CustomHeader
                    title={`Quiz ${deck.name}`}
                    navigation={navigation}
                    showBack={true}
                />
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderItem={card => {
                            console.log("RENDER CARD ", card);
                            return (
                                <QuizCard
                                    key={card.id}
                                    card={card}
                                    style={{
                                        minHeight: 200,
                                        elevation: 3,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        elevation: 3
                                    }}
                                />
                            );
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        position: "absolute",
                        bottom: 50,
                        left: 0,
                        right: 0,
                        justifyContent: "space-between",
                        padding: 15
                    }}
                >
                    <Button
                        iconLeft
                        onPress={() => this._deckSwiper._root.swipeLeft()}
                    >
                        <Icon name="arrow-back" />
                        <Text>Swipe Left</Text>
                    </Button>
                    <Button
                        iconRight
                        onPress={() => this._deckSwiper._root.swipeRight()}
                    >
                        <Icon name="arrow-forward" />
                        <Text>Swipe Right</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const deck = navigation.getParam("deck");
    return {
        deck,
        cards: getCardsByDeckId(state, deck.id)
    };
}

export default connect(mapStateToProps)(Quiz);
