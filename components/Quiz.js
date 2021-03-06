import React, { Component } from "react";
import {
    Container,
    DeckSwiper,
    View,
    Text,
    Button,
} from "native-base";
import { connect } from "react-redux";
import { getCardsByDeckId } from "./../selectors/index";
import CustomHeader from "./CustomHeader";
import QuizCard from "./QuizCard";
import { StyleSheet } from 'react-native';
import { calculateScoreQuiz, generateTextByScoreQuiz, generateEmojiByScoreQuiz, clearLocalNotification, setLocalNotification } from './../utils/helpers';
import { lightGray } from "../utils/colors";
import { handleResultQuiz } from "../actions";

class Quiz extends Component {
    state = {
        correctCount: 0,
        cardHeight: undefined
    };

    /**
     * Contabilizar o acerto da questão e apresentar a próxima
     */
    onNextCard = (card, response) => {
        if (response) {
            this.setState({
                correctCount: this.state.correctCount + 1
            });
        }
        //
        this._deckSwiper._root.swipeRight();
    };

    /**
     * Gravar estatísticas do Quiz no baralho e reinicair
     * 
     * @param {Number} perc: 
     */
    onRestartQuiz = (perc) => {
        this.setState({
            correctCount: 0
        });
        
        const { navigation, deck, dispatch } = this.props;

        navigation.replace('Quiz', {deck})

        dispatch(handleResultQuiz(deck, perc))

        clearLocalNotification()
            .then(setLocalNotification)
    };

    /**
     * Gravar estatísticas do Quiz no baralho e voltar para a tela de detalhes
     * 
     * @param {Number} perc: 
     */
    onBackToDeck = (perc) => {
        const { navigation, deck, dispatch } = this.props;
        
        navigation.goBack();

        dispatch(handleResultQuiz(deck, perc))

        clearLocalNotification()
            .then(setLocalNotification)
    };

    /**
     * Existe uma certa dificuldade de ajustar o tamanho Card.
     * Para funcionar foi necessário capturar o tamanho do layout em tempo de execução
     * para definir um tamanho fixo no Card.
     * 
     */
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
                                            onPress={() => this.onRestartQuiz(perc)}
                                        >
                                            <Text>Restart Quiz</Text>
                                        </Button>
                                        <Button
                                            large
                                            block                                            
                                            style={styles.buttonResult}
                                            onPress={() => this.onBackToDeck(perc)}
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
