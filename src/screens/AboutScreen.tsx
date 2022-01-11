import React from "react";
import {Container, Text, Header, Content, Left, Body, Right, Title, Button} from "native-base";
import {MessageBox} from "../components/MessageBox";
import {useDispatch} from "react-redux";
import {messageBoxActions} from "../core/actions/MessageBox.actions";
import * as WebBrowser from 'expo-web-browser';
import i18n from "../i18n";
import {StyleSheet} from "react-native";

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
                    <Title>{i18n.t('title.about')}</Title>
                </Body>
                <Right/>
            </Header>
            <Content contentContainerStyle={styles.container}>
                <Text style={styles.text}>{i18n.t('about.text')}</Text>
                <Text style={styles.link}
                      onPress={openGitHubPage}>{i18n.t('about.github')}</Text>
                <Button primary onPress={() => {
                    dispatch(messageBoxActions.show(i18n.t('about.example_msg'),
                        'info',
                        true, 0))
                }}><Text>{i18n.t('about.btn_text')}</Text></Button>
            </Content>
            <MessageBox/>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        maxWidth: '80%',
        textAlign: 'center'
    },
    link: {
        color: '#4d90cc',
        padding: 20
    }
});
