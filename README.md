# Product Manager Demo
Yet another React Native CRUD app, written in
TypeScript for demo purposes. Features:
- View product list
- View product details
- Add new product
- Edit products
- Delete products

See also [Technical Features](#technical-features)

Written to recall React Native after years, learn hooks
and Firebase integration.

## Requirements
* React Native CLI
* (optional) Expo CLI
* Created Firebase project with Firestore database
* (Recommended) Yarn

## Installation
1. Clone Repo
2. `yarn install`
3. Mac/iOS only: `cd ios && pod install && cd ..`
4. Download Google Services config files
   - Put `google-services.json` in `./android/app`.
   See docs [here](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials) 
   for Android
   - Put `GoogleService-Info.plist` in `./ios/ProductManagerDemo`
   See docs [here](https://invertase.io/oss/react-native-firebase/quick-start/ios-firebase-credentials)
   for iOS
   - **Expo users**: Fill in `firebase_credentials.json` with your
   Firebase project data

## Running
`package.json` contains a few run scripts:
* `start` - Runs just Metro bundler
* `android` - Builds Android project and runs it (Requires Android SDK)
* `ios` - Builds iOS project and runs it (Requires Xcode)
* `expo` - Runs expo daemon - possible to open app in Expo Client

## Stack
* React Native
* Expo - uses bare workflow
* React Navigation 
* Native-base - for UI components
* Redux
* Redux Saga
* Firestore database
* React Native Firebase - for native builds
* Firebase JS SDK - for Expo client

## Technical features
* Two implementations of data management API: Firebase Firestore
and simple in-memory dictionary based API for demo purposes. Interfaces
needed to create custom implementation are provided.
* Support for event-driven APIs (for example Firestore `onSnapshot()`)
* Expo Client doesn't support native modules, React-Native-Firebase
cannot be used. [See details](https://docs.expo.io/versions/v36.0.0/guides/using-firebase/).
App provides auto fallback Firebase JS SDK and loads it instead of RNFirebase
when using Expo Client.
> Note: React-Native-Firebase and Firebase JS SDK provide identical API,
> so there's no need to split implementatnion

## File structure
* `index.js` - React Native main file
* `App.tsx` - Expo main file. Redirects to `src/app.tsx`
* `firebase_credentials.json` - For Expo users - credentials
 to Firebase JS SDK
* `src` - App source code
* `src/App.tsx` - Main App component
* `src/api` - Product API interfaces and implementations
  - `Firestore` - Firestore API implementation
    - `firestoreProvider.ts` and `firestoreProvider.expo.ts` - 
    provide proper Firebase implementation when using Expo or not
  - `Fake` - FakeApi - simple dictionary based in-memory API impl.
* `src/components` - React components
* `src/core` - Redux implementation files
  - `actions` - Redux Action definitions
  - `constants` - names and type names for actions
  - `reducers`
  - `sagas` - Side effects for actions.
    - `products.saga.ts` - Connects Redux actions and store with API
* `src/hooks` - custom React hooks
* `src/navigation` - React-navigation route and screen configuration
* `src/screens` - Navigation Screen component definitions
* `src/utils` - Common utility code

## Not yet implemented
* Unit tests
