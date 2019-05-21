import React, { Component } from "react";
import {
    Text,
    Container,
    Button,
    Content,
    Form,
    Item,
    Label,
    Input,
} from "native-base";
import CustomHeader from "./CustomHeader";
import { connect } from 'react-redux';
import { handleNewDeck } from "../actions";

class NewDeck extends Component {
    state = {
        title: null
    };

    onChangeTitle = (text) => {
        this.setState({
            title: text
        })
    }

    onConfirm = () => {
        const {dispatch, navigation} = this.props
        dispatch(handleNewDeck({name: this.state.title, countCards: 0}))
        navigation.goBack()
    }

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <CustomHeader title={"New Deck"} navigation={navigation} showBack={true}/>
                <Content>
                    <Form
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input onChangeText={this.onChangeTitle}/>
                        </Item>
                        <Item>
                            <Button large success style={{ marginTop: 20 }} onPress={this.onConfirm} >
                                <Text>Confirm</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default connect()(NewDeck)
