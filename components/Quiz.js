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
import { calculateScoreQuiz, generateTextByScoreQuiz, generateEmojiByScoreQuiz } from './../utils/helpers';
import { lightGray } from "../utils/colors";

class Quiz extends Component {
    state = {
        correctCount: 0,
        cardHeight: undefined
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

    onLayoutMain = (event) => {
        const { height } = event.nativeEvent.layout;
        if(this.state.cardHeight){
            return
        }
        this.setState({
            cardHeight: height - (styles.quizMain.margin * 3)
        })
    }

    render() {
        const { cards, deck, navigation } = this.props;
        const { cardHeight } = this.state;
        return (
            <Container>
                <CustomHeader
                    title={`Quiz ${deck.name}`}
                    navigation={navigation}
                    showBack={true}
                />
                <View style={styles.quizMain} onLayout={this.onLayoutMain}>
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
                                    style={[styles.quizCard, {minHeight: cardHeight}]}
                                />
                            );
                        }}
                        renderEmpty={() => {
                            const { correctCount } = this.state
                            const perc = calculateScoreQuiz(correctCount, cards.length)
                            const textScore = generateTextByScoreQuiz(perc)
                            const textEmoji = generateEmojiByScoreQuiz(perc)
                            return (
                                <View style={[styles.quizResult, {minHeight: cardHeight}]}>
                                    <Text style={styles.titleResult}>
                                        Result Quiz
                                    </Text>
                                    <Text style={styles.textResult}>
                                        {textScore}
                                    </Text>
                                    <Text style={styles.textResultEmoji}>
                                        {textEmoji}
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
    quizMain: {
        margin: 10,
        flex: 1,
        backgroundColor: lightGray
    },
    quizCard: {
        flex: 1,
        alignSelf: 'stretch',
        elevation: 3
    },
    quizResult: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleResult: {
        fontSize: 40,        
        textAlign: 'center'
    },
    textResult: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center'
    },
    textResultEmoji: {
        fontSize: 24,
        marginTop: 20,
        textAlign: 'center'
    },
    buttonResult: {
        marginTop: 48,
        alignSelf: "center"
    },
});

function mapStateToProps(state, { navigation }) {
    const deck = navigation.getParam("deck");
    return {
        deck,
        cards: getCardsByDeckId(state, deck.id)
    };
}

export default connect(mapStateToProps)(Quiz);
