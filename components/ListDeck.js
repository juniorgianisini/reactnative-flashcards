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

class ListDeck extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleGetAllDecks());
    }

    render() {
        const { decks } = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: white }}>DECKS</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="add" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Container style={{ flex: 1, justifyContent: "center" }}>
                        {decks.map(deck => (
                                <Card key={deck.name} style={{ flex: 1 }}>
                                    <CardItem
                                        style={{
                                            flex: 1,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Body>
                                            <Text style={{ fontSize: 30 }}>
                                                {deck.name}
                                            </Text>
                                            <Text>{deck.countCards} card</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            ))}
                    </Container>
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
