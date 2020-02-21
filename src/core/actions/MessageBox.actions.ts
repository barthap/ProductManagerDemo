import {IMessageBoxState} from "../reducers/MessageBoxReducer";
import {Action, ActionCreator} from "redux";
import {MESSAGEBOX_DISMISS, MESSAGEBOX_SHOW, messageBoxConstants} from "../constants/MessageBox.constants";
import {AlertStyle} from "../../components/MessageBox";

type MessageBoxActionPayload = Partial<IMessageBoxState> & { duration: number };

export interface MessageBoxShowAction extends Action {
    type: MESSAGEBOX_SHOW;
    payload: MessageBoxActionPayload;
}

export interface MessageBoxDismissAction extends Action {
    type: MESSAGEBOX_DISMISS;
}

const show = (message: string,
              style: AlertStyle,
              dismissible: boolean = true,
              duration: number = null): MessageBoxShowAction => ({
    type: messageBoxConstants.SHOW,
    payload: {message, dismissible, duration, visible: true, alertStyle: style}
});
const dismiss: ActionCreator<MessageBoxDismissAction> = () => ({ type: messageBoxConstants.DISMISS });

export const messageBoxActions = {
    show, dismiss
};
