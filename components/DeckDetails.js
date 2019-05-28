import React, { Component } from "react";
import { Button, Container, Content, Text, View } from "native-base";
import CustomHeader from "../components/CustomHeader";
import Deck from "./Deck";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getDeckById } from "../selectors";
import { formatDate } from "../utils/helpers";

class DeckDetails extends Component {
    state = {
        minor: 0,
        major: 0
    };
    onAddCard = () => {
        const { navigation, deck } = this.props;
        navigation.navigate("NewCard", { deck });
    };

    onStartQuiz = () => {
        const { navigation, deck } = this.props;
        navigation.navigate("Quiz", { deck });
    };

    render() {
        const { navigation, deck } = this.props;

        let stats = "0% / 0%";
        let lastDate = "";
        if (deck.statsQuiz) {
            stats = `${deck.statsQuiz.minor}% / ${deck.statsQuiz.major}%`;
            lastDate = formatDate(deck.statsQuiz.lastDate);
        }

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

                    <View style={styles.stats}>
                        <Text>{`Minor/Major Result: ${stats}`}</Text>
                        <Text>{`Last Quiz: ${lastDate}`}</Text>
                    </View>

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
        alignSelf: "center"
    },
    stats: {
        alignSelf: "center",
        marginBottom: 20,
    }
});

function mapStateToProps(state, { navigation }) {
    return {
        deck: getDeckById(state, navigation.getParam("deckId"))
    };
}

export default connect(mapStateToProps)(DeckDetails);
