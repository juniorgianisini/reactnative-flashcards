import React, { Component } from "react";
import { Button, Container, Content, Text, View } from "native-base";
import CustomHeader from "../components/CustomHeader";
import Deck from "./Deck";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getDeckById } from "../selectors";

class DeckDetails extends Component {
    onAddCard = () => {
        const { navigation } = this.props;
        let deck = this.props.deck;
        navigation.navigate("NewCard", { deck });
    };

    onStartQuiz = () => {
        const { navigation } = this.props;
        let deck = this.props.deck;
        navigation.navigate("Quiz", { deck });
    };

    render() {
        const { navigation } = this.props;
        let deck = this.props.deck;
        return (
            <Container>
                <CustomHeader
                    title={"Deck Details"}
                    navigation={navigation}
                    showBack={true}
                />
                <Content>
                    <Deck
                        deck={deck}
                        cardMode={{ transparent: true }}
                        style={{ minHeight: 150 }}
                    />
                    <Button
                        large
                        bordered
                        style={styles.buttonDeck}
                        onPress={this.onAddCard}
                    >
                        <Text>Create New Question</Text>
                    </Button>
                    <Button
                        large
                        block
                        style={styles.buttonDeck}
                        onPress={this.onStartQuiz}
                        disabled={deck.cards.length == 0}
                    >
                        <Text>Start Quiz</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonDeck: {
        marginTop: 20,
        alignSelf: 'center'        
    }
});

function mapStateToProps(state, { navigation }) {
    return {
        deck: getDeckById(state, navigation.getParam("deckId"))
    };
}

export default connect(mapStateToProps)(DeckDetails);
