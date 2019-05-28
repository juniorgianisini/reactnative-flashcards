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
import { StyleSheet } from "react-native";

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
        const card = createCard(
            deck.id,
            this.state.question,
            this.state.answer
        );
        await dispatch(handleNewCard(deck, card));

        navigation.goBack();
    };

    render() {
        const { navigation } = this.props
        const { question, answer } = this.state

        return (
            <Container>
                <CustomHeader
                    title={"New Card"}
                    navigation={navigation}
                    showBack={true}
                />
                <Content>
                    <Form style={styles.formCard}>
                        <Item floatingLabel>
                            <Label>Question:</Label>
                            <Input
                                style={styles.textCardQuestion}
                                multiline={true}
                                maxLength={64}
                                onChangeText={text =>
                                    this.onChangeText("question", text)
                                }
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Answer: </Label>
                            <Input
                                style={styles.textCardAnswer}
                                multiline={true}
                                maxLength={64}
                                onChangeText={text =>
                                    this.onChangeText("answer", text)
                                }
                            />
                        </Item>
                        <Item>
                            <Button
                                large
                                block
                                disabled={ question === null || answer === null || question.trim() === '' || answer.trim() === '' }
                                style={styles.buttonCard}
                                onPress={this.onConfirm}
                            >
                                <Text>Create Question</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textCardQuestion: {
        fontSize: 30
    },
    textCardAnswer: {
        fontSize: 24
    },
    formCard: {
        flex: 1,
        alignItems: "center"
    },
    buttonCard: {
        marginTop: 48,
        alignSelf: "center"
    }
});

export default connect()(NewCard);
