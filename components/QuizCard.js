import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, Card, CardItem, View, Button } from "native-base";

class QuizCard extends Component {
    state = {
        showResponse: false
    };

    /**
     * Callback disparado quando usuário confirma um acerto de uma questão
     */
    onCorrect = () => {
        this.setState({
            showResponse: false
        });
        const { card } = this.props;
        //Ir para o próximo cartão do baralho
        this.props.onNextCard(card, true);
    };

    /**
     * Callback disparado quando o usuário confirma que errou uma questão
     */
    onIncorrect = () => {
        this.setState({
            showResponse: false
        });
        const { card } = this.props;
        //Ir para o próximo cartão do baralho
        this.props.onNextCard(card, false);
    };

    /**
     * Apresentar a resposta da questão
     */
    onShowAnswer = () => {
        this.setState({
            showResponse: true
        });
    };

    render() {
        const { card, style = {}, descIndex } = this.props;

        const { showResponse } = this.state;
        
        return (
            <Card>
                <CardItem>
                    <View
                        style={[styles.cardBody, ...style]}
                    >
                        <Text style={styles.textCard}>
                            {showResponse ? card.answer : card.question}
                        </Text>
                        <Text>{descIndex}</Text>
                        {showResponse ? (
                            <View>
                                <Button
                                    large
                                    success
                                    style={styles.buttonCard}
                                    onPress={this.onCorrect}
                                >
                                    <Text>Correct</Text>
                                </Button>
                                <Button
                                    large
                                    warning
                                    style={styles.buttonCard}
                                    onPress={this.onIncorrect}
                                >
                                    <Text>Incorrect</Text>
                                </Button>
                            </View>
                        ) : (
                            <View>
                                <Button
                                    large
                                    bordered
                                    style={styles.buttonCard}
                                    onPress={this.onShowAnswer}
                                >
                                    <Text>Show Answer</Text>
                                </Button>
                            </View>
                        )}
                    </View>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardBody: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textCard: {
        fontSize: 30,
        textAlign: "center"
    },
    buttonCard: {
        marginTop: 48,
        alignSelf: "center"
    }
});

export default QuizCard;
