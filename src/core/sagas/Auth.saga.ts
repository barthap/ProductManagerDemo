import { eventChannel } from 'redux-saga';
import { take, takeEvery, all, put } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { authConstants } from '../constants/Auth.constants';
import { authActions, LoginAction, RegisterAction } from '../actions/Auth.actions';
import { ProductEventManager } from '../../api';

function* watchLogin() {
  yield takeEvery(authConstants.LOGIN, function* (action: LoginAction) {
    try {
      const { email, password } = action.payload;
      yield auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          console.warn('Auth error', e.code, e.message);
          yield put(authActions.authError(e.message));
          break;
        default:
          console.error(e);
          break;
      }
    }
  });
}

function* watchLogout() {
  yield takeEvery(authConstants.LOGOUT, function* () {
    if (auth().currentUser != null) {
      yield auth().signOut();
    } else {
      console.log('Already signed out. Calling logout success');
      yield put(authActions.logoutSuccess());
    }
  });
}

function* watchRegister() {
  yield takeEvery(authConstants.REGISTER, function* (action: RegisterAction) {
    try {
      const { email, password, name } = action.payload;
      yield auth().createUserWithEmailAndPassword(email, password);
      yield auth().currentUser!!.updateProfile({ displayName: name });
      yield put(authActions.updateUser(auth().currentUser!!));
    } catch (e: any) {
      switch (e.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/operation-not-allowed':
        case 'auth/weak-password':
          console.warn('Register error', e.code, e.message);
          yield put(authActions.authError(e.message));
          break;
        default:
          console.error(e);
          break;
      }
    }
  });
}

function* authStateListener() {
  const channel = eventChannel((emit) => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log('Auth state changed. User:', user);
      emit({ user: user });
    });

    return unsubscribe;
  });

  while (true) {
    const { user } = yield take(channel);

    //logged out
    if (user == null) {
      yield put(authActions.logoutSuccess());
    } else {
      //API event manager must be restarted
      //in order to load products for new user
      ProductEventManager.restart();
      yield put(authActions.loginSuccess(user));
    }
  }
}

export function* authSaga() {
  yield all([watchLogin(), watchLogout(), watchRegister(), authStateListener()]);
}
