import React from "react";
import {Container, Text, Header, Content, Left, Body, Right, Title, Button, Icon} from "native-base";
import {MessageBox} from "../components/MessageBox";
import {useDispatch} from "react-redux";
import i18n from "../i18n";
import {authActions} from "../core/actions/Auth.actions";
import {typedUseSelector} from "../hooks/typedUseSelector";


export function ProfileScreen() {
    const dispatch = useDispatch();
    const user = typedUseSelector(state => state.auth.user);

    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>{i18n.t('title.profile')}</Title>
                </Body>
                <Right>
                    <Icon name="account-edit"
                          type="MaterialCommunityIcons"
                          onPress={() => alert('xD')}/>
                </Right>
            </Header>
            <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>UID: {user.uid}</Text>
                <Text>e-mail: {user.email}</Text>
                <Text>Display name: {user.displayName}</Text>
                <Text>Phone: {user.phoneNumber}</Text>
                <Text>Photo URL: {user.photoURL}</Text>
                <Text>Provider ID: {user.providerId}</Text>

                <Text>Provider data: {JSON.stringify(user.providerData)}</Text>
                <Button primary onPress={() => {
                    dispatch(authActions.logout());
                }}><Text>{i18n.t('profile.logout')}</Text></Button>
            </Content>
            <MessageBox/>
        </Container>
    );
}
