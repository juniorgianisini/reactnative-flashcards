import React, { Component } from "react";
import {
    Button,
    Container,
    Icon,
    Content
} from "native-base";
import { connect } from "react-redux";
import { handleGetAllDecks, handleGetAllCards } from "../actions";
import { getAllDecksSelector } from "../selectors";
import CustomHeader from "../components/CustomHeader";
import { Deck } from "./Deck";

class ListDeck extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleGetAllDecks());
        dispatch(handleGetAllCards());
    }

    newDeck = () => {
        this.props.navigation.navigate("NewDeck");
    };

    onShowDeck = (deck) => {
        const {navigation} = this.props
        navigation.navigate('DeckDetails', {deckId: deck.id})
    }

    render() {
        const { decks, navigation } = this.props;
        return (
            <Container>
                <CustomHeader
                    title={"Decks"}
                    navigation={navigation}
                    showBack={false}
                >
                    <Button transparent onPress={this.newDeck}>
                        <Icon name="add" />
                    </Button>
                </CustomHeader>
                <Content>
                    {decks.map(deck => (
                        <Deck key={deck.id} deck={deck} style={{minHeight: 100}} onPressDeck={() => this.onShowDeck(deck)} />
                    ))}
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: getAllDecksSelector(state)
    };
}

export default connect(mapStateToProps)(ListDeck);
