import React, { Component } from "react";
import { Text, Container, Card, CardItem, Body, Button, Left, Header } from "native-base";

export default class Deck extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>DECK</Text>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem bordered>
                            <Body>
                                <Text>Teste</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
