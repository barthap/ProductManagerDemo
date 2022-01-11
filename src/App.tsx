import React from "react";
import { AppNavigation } from "./navigation/navigation";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./core/reducers";
import { rootSaga } from "./core/sagas";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

//Main app component
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigation />
        <StatusBar />
      </Provider>
    </SafeAreaProvider>
  );
}
