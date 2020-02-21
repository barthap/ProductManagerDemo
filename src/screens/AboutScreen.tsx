import React from "react";
import {Container, Text, Header, Content, Left, Body, Right, Title, Button} from "native-base";
import {MessageBox} from "../components/MessageBox";
import {useDispatch} from "react-redux";
import {messageBoxActions} from "../core/actions/MessageBox.actions";
import * as WebBrowser from 'expo-web-browser';

function openGitHubPage() {
    WebBrowser.openBrowserAsync('https://github.com/barthap/ProductManagerDemo');
}

export function AboutScreen() {
    const dispatch = useDispatch();
    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>About app</Title>
                </Body>
                <Right />
            </Header>
            <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Product Manager Demo. This app is just another CRUD demo.</Text>
                <Text style={{color: '#4d90cc', padding: 20}}
                      onPress={openGitHubPage}>See GitHub page</Text>
                <Button primary onPress={() => {
                    dispatch(messageBoxActions.show('This is just a simple message box used for ' +
                        'testing purposes',
                        'info',
                        true, 0))
                }}><Text>Tap me</Text></Button>
            </Content>
            <MessageBox/>
        </Container>
    );
}
