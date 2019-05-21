import React, { Component } from "react";
import {
    Button,
    Container,
    Header,
    Icon,
    Body,
    Left,
    Content,
    Text,
    CardItem,
    Card,
    Right
} from "native-base";
import { white } from "./../utils/colors";
import { connect } from "react-redux";
import { handleGetAllDecks } from "../actions";
import { getAllDecksSelector } from "../selectors";
import CustomHeader from "../components/CustomHeader";
import { NavigationActions } from 'react-navigation'
import { ScrollView } from "react-native-gesture-handler";

class ListDeck extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleGetAllDecks());
    }

    newDeck = () => {
        this.props.navigation.navigate('NewDeck')
    }

    render() {
        const { decks, navigation } = this.props;
        return (
            <Container>
                <CustomHeader title={"Decks"} navigation={navigation} showBack={false}>
                    <Button transparent onPress={this.newDeck}>
                        <Icon name="add" />
                    </Button>
                </CustomHeader>
                <Content>
                    {decks.map(deck => (
                        <Card key={deck.id}>
                            <CardItem>
                                <Body style={{ flex: 1, minHeight: 150, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30 }}>
                                        {deck.name}
                                    </Text>
                                    <Text>{deck.countCards} card</Text>
                                </Body>
                            </CardItem>
                        </Card>
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
