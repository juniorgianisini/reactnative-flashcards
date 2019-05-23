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
import { handleNewCard } from "../actions";
import { createCard } from "../utils/helpers";

class NewCard extends Component {
    state = {
        question: null,
        answer: null
    };

    onChangeText = (key, text) => {
        this.setState({
            [key]: text
        });
    };

    onConfirm = async () => {
        const { dispatch, navigation } = this.props;
        let deck = this.props.deck;
        
        if (!deck && navigation) {
            deck = navigation.getParam("deck", {});
        }
        const card = createCard(deck.id, this.state.question, this.state.answer)
        await dispatch(handleNewCard(deck, card));
        
        navigation.goBack();
    };

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <CustomHeader
                    title={"New Card"}
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
                        <Item floatingLabel style={{ marginTop: 20 }}>
                            <Label>Question: </Label>
                            <Input onChangeText={(text) => this.onChangeText('question', text)} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 20 }}>
                            <Label>Answer: </Label>
                            <Input onChangeText={(text) => this.onChangeText('answer', text)} />
                        </Item>
                        <Item style={{ marginTop: 20 }}>
                            <Button
                                large
                                block                                
                                onPress={this.onConfirm}
                            >
                                <Text>Confirm</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default connect()(NewCard);
