import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Icon} from "native-base";
import {useDispatch } from "react-redux";
import {IMessageBoxState} from "../core/reducers/MessageBoxReducer";
import {typedUseSelector} from "../utils/typedUseSelector";
import {messageBoxActions} from "../core/actions/MessageBox.actions";

interface MessageBoxComponentProps {
    iconShown?: boolean;
    iconName?: typeof Icon.name
    dismissButtonShown?: boolean;
    backgroundColor?: string;
    textColor?: string;
    children: React.ReactNode
    onDismiss?: () => void;
}

//raw "dumb" component
export function MessageBoxComponent(props: MessageBoxComponentProps) {
    const messageStyle = props.textColor ? {...styles.message, color: props.textColor} : styles.message;

    return (<View style={{...styles.container, backgroundColor: props.backgroundColor}}>
        {props.iconShown && <Icon name={props.iconName} style={styles.iconL} fontSize={15} />}
        <Text style={messageStyle}>{props.children}</Text>
        {props.dismissButtonShown && <Icon name="ios-close"
              fontSize={20} style={styles.iconR}
              onPress={props.onDismiss} />}
    </View>);
}

export type MessageBoxStyle = Partial<MessageBoxComponentProps>;
export type AlertStyle = 'info' | 'error' | 'success';

const infoMessageBoxStyle: MessageBoxStyle = {
    iconShown: true,
    iconName: 'ios-information-circle',
    backgroundColor: '#95D4FF',
    textColor: '#024aff',
};
const successMessageBoxStyle: MessageBoxStyle = {
    iconShown: false,
    backgroundColor: '#8dff71',
    textColor: '#00aa01',
};
const errorMessageBoxStyle: MessageBoxStyle = {
    iconShown: true,
    iconName: 'ios-alert',
    backgroundColor: '#ff8273',
    textColor: '#aa0300',
};

function getMessageBoxStyle(styleName: AlertStyle): MessageBoxStyle {
    switch (styleName) {
        case "error":
            return  errorMessageBoxStyle;
        case "info":
            return  infoMessageBoxStyle;
        case "success":
            return  successMessageBoxStyle;
    }
}

export function MessageBox() {
    const mb = typedUseSelector<IMessageBoxState>(state => state.messageBox);
    const style = getMessageBoxStyle(mb.alertStyle);
    const dispatch = useDispatch();

    if(!mb.visible) return <View/>; //When hidden, render empty View
    return (
        <MessageBoxComponent onDismiss={() => dispatch(messageBoxActions.dismiss())}
                             {...style}
                             dismissButtonShown={mb.dismissible}>
            {mb.message}
        </MessageBoxComponent>
    );
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        padding: 15,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    message: {
        flex: 8,
        fontSize: 15,
        fontWeight: 'bold'
    },
    iconL: {
        flex: 1,
        paddingRight: 5
    },
    iconR: {
        alignSelf: 'flex-end',
        flex: 1,
        paddingLeft: 5
    }
});
