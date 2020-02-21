console.log('Using Native Firestore Provider');

//This file is used when running as normal react-native app
//Expo uses firestoreProvider.expo.ts
//This file imports native modules, inaccessible by Expo client

//Just re-export original React-Native-Firebase modules used by api

import firestoreNative, {FirebaseFirestoreTypes as FFTypes} from '@react-native-firebase/firestore';
export {FFTypes as FirebaseFirestoreTypes};
export default firestoreNative;


