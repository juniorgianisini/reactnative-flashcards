import React from "react";
import { StatusBar } from "react-native";
import { Font, Constants, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Container, Root, View } from "native-base";
import { purple, white } from "./utils/colors";
import { createAppContainer, createStackNavigator } from "react-navigation";
import ListDeck from "./components/ListDeck";
import Deck from "./components/Deck";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from './middleware'
import NewDeck from "./components/NewDeck";
import DeckDetails from './components/DeckDetails';
import NewCard from './components/NewCard';
import Quiz from "./components/Quiz";

function CustomStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

const MainNavigator = createAppContainer(
    createStackNavigator({
        home: {
            screen: ListDeck,
            navigationOptions: {
                header: null
            }
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                header: null
            }
        },
        DeckDetails: {
            screen: DeckDetails,
            navigationOptions: {
                header: null
            }
        },
        NewCard: {
            screen: NewCard,
            navigationOptions: {
                header: null
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                header: null
            }
        },
    })
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ...Ionicons.font
        });        
        this.setState({ loading: false });
    }

    render() {
        
        if (this.state.loading) {
            return (
                <Root>
                    <AppLoading />
                </Root>
            );
        }
        return (
            <Provider store={createStore(reducer, middleware)}>
                <Container>
                    <CustomStatusBar
                        backgroundColor={purple}
                        barStyle="light-content"
                    />
                    <MainNavigator />
                </Container>
            </Provider>
        );
    }
}

export default App