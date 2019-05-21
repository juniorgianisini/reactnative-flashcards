import React from "react";
import { Text, Header, Left, Button, Icon, Body, Right } from "native-base";
import { white } from "../utils/colors";

const CustomHeader = ({ title, children, navigation, showBack }) => (
    <Header>
        {showBack && (
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
        )}
        <Body>
            <Text style={{ color: white }}>{title}</Text>
        </Body>
        <Right>{children}</Right>
    </Header>
);

export default CustomHeader;
