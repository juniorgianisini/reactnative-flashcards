import React, { Component } from "react";
import {
    Text,
    Container,
    Button,
    Content,
    Form,
    Item,
    Label,
    Input
} from "native-base";
import CustomHeader from "./CustomHeader";
import { connect } from "react-redux";
import { handleNewDeck } from "../actions";
import { createteDeck } from "../utils/helpers";

class NewDeck extends Component {
    state = {
        title: null
    };

    onChangeTitle = text => {
        this.setState({
            title: text
        });
    };

    onConfirm = async () => {
        const { dispatch, navigation } = this.props;
        const deck = createteDeck(this.state.title)
        await dispatch(handleNewDeck(deck));
        navigation.navigate('DeckDetails', {deckId: deck.id})
    };

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <CustomHeader
                    title={"New Deck"}
                    navigation={navigation}
                    showBack={true}
                />
                <Content>
                    <Form
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input onChangeText={this.onChangeTitle} />
                        </Item>
                        <Item>
                            <Button
                                large
                                block
                                style={{ marginTop: 20 }}
                                onPress={this.onConfirm}
                            >
                                <Text>Create Deck</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default connect()(NewDeck);
