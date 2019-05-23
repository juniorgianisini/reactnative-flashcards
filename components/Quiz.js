import React, { Component } from "react";
import {
    Container,
    DeckSwiper,
    View,
    Text,
    Button,
    Icon,
    Right
} from "native-base";
import { connect } from "react-redux";
import { getCardsByDeckId } from "./../selectors/index";
import CustomHeader from "./CustomHeader";
import QuizCard from "./QuizCard";
import { StyleSheet } from 'react-native';

class Quiz extends Component {
    state = {
        correctCount: 0
    };

    onNextCard = (card, response) => {
        if (response) {
            this.setState({
                correctCount: this.state.correctCount + 1
            });
        }
        this._deckSwiper._root.swipeRight();
    };

    onRestartQuiz = () => {
        this.setState({
            correctCount: 0
        });
        const { navigation, deck } = this.props;
        navigation.replace('Quiz', {deck})
    };

    onBackToDeck = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };


    render() {
        const { cards, deck, navigation } = this.props;
        return (
            <Container>
                <CustomHeader
                    title={`Quiz ${deck.name}`}
                    navigation={navigation}
                    showBack={true}
                />
                <View style={{ margin: 20 }}>
                    <DeckSwiper
                        ref={c => (this._deckSwiper = c)}
                        dataSource={cards}
                        looping={false}
                        renderItem={item => {
                            const index = cards.findIndex(
                                card => card.id === item.id
                            );
                            return (
                                <QuizCard
                                    key={item.id}
                                    card={item}
                                    descIndex={`${index + 1}/${cards.length}`}
                                    onNextCard={this.onNextCard}
                                    style={styles.quizCard}
                                />
                            );
                        }}
                        renderEmpty={() => {
                            const { correctCount } = this.state;
                            const perc = (correctCount * 100) / cards.length;
                            return (
                                <View>
                                    <Text style={styles.textResult}>
                                        In this quiz you answered {perc}% of the
                                        questions
                                    </Text>
                                    <View>
                                        <Button
                                            large
                                            bordered
                                            style={styles.buttonResult}
                                            onPress={this.onRestartQuiz}
                                        >
                                            <Text>Restart Quiz</Text>
                                        </Button>
                                        <Button
                                            large
                                            block
                                            style={styles.buttonResult}
                                            onPress={this.onBackToDeck}
                                        >
                                            <Text>Back to Deck</Text>
                                        </Button>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textResult: {
        fontSize: 30
    },
    quizCard: {
        minHeight: 400,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10,
        elevation: 3
    },
    buttonResult: {
        marginTop: 20,
        alignSelf: "center",
        alignContent: "flex-end"
    }
});

function mapStateToProps(state, { navigation }) {
    const deck = navigation.getParam("deck");
    return {
        deck,
        cards: getCardsByDeckId(state, deck.id)
    };
}

export default connect(mapStateToProps)(Quiz);
