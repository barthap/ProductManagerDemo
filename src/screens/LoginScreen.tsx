
import React, {useEffect, useState} from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import {StackNavigationProp} from "@react-navigation/stack";
import {Nav, RootStackParamList} from "../navigation/routeNames";
import {useDispatch} from "react-redux";
import {useComponentLifecycleLog} from "../hooks/useComponentLifecycleLog";
import {authActions} from "../core/actions/Auth.actions";

type LoginNavProp = StackNavigationProp<RootStackParamList, typeof Nav.Login>;
type Props = {
    navigation: LoginNavProp
}

export function LoginScreen(props: Props) {
    const [email, setEmail] = useState('a@b.com');
    const [password, setPassword] = useState('zaq1@WSX');
    const dispatch = useDispatch();

    useComponentLifecycleLog('Login Screen');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={val => setEmail(val)}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={val => setPassword(val)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => dispatch(authActions.login(email,password))}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button title="Don't have an account yet? Sign up"  onPress={() => props.navigation.navigate(Nav.Register)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})
