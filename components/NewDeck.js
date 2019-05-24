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
import { StyleSheet } from "react-native";

class NewDeck extends Component {
    state = {
        title: null
    };

    onChangeTitle = text => {
        this.setState({
            name: text
        });
    };

    onConfirm = async () => {
        const { dispatch, navigation } = this.props;
        const deck = createteDeck(this.state.name);
        await dispatch(handleNewDeck(deck));
        navigation.navigate("DeckDetails", { deckId: deck.id });
    };

    onCancel = () => {
        const { navigation } = this.props;
        navigation.goBack();
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
                        style={styles.formDeck}
                    >
                        <Item floatingLabel>
                            <Label>Name:</Label>
                            <Input
                                style={styles.textDeck}
                                onChangeText={this.onChangeTitle}
                                maxLength={30}
                                multiline={true}
                            />
                        </Item>
                        <Item>
                            <Button
                                large
                                block
                                style={styles.buttonDeck}
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

const styles = StyleSheet.create({
    textDeck: {
        fontSize: 30
    },
    formDeck: {
        flex: 1,
        alignItems: "center"
    },
    buttonDeck: {
        marginTop: 48,
        alignSelf: 'center'        
    }
});

export default connect()(NewDeck);
