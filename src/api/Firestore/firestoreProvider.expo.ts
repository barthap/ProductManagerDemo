
//Expo client automatically loads this file instead of firestoreProvider.ts
//Here we use Firebase Node.js API

console.log('Expo - Using Node.js Firestore provider');

import firebaseConfig from '../../../firebase_credentials.json';
import * as firebase from 'firebase';

import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default () => db;
