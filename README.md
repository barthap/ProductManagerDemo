# Product Manager Demo

This repository is a demo app based on my **[article on Expo + React Native Firebase integration](https://bartlomiej-klocek.medium.com/how-to-integrate-react-native-firebase-into-expo-d34712eaf64d)** - it uses Expo Development Client and Config Plugins to integrate native Firebase into Expo app. Read the article for more details.

> This repo was recently updated from Expo SDK 36 to 44, after two years. There's still lots of old code, which may not follow current best practices. **This README might not be fully up-to-date too**.

Yet another React Native CRUD app, written in
TypeScript for demo purposes. Features:

- View product list
- View product details
- Add, edit and delete products
- Language/i18n support
- Google (Firebase) Analytics integration
- User accounts (Firebase auth). Sign in and Sign up support.
- Display to users their own products.

See also [Technical Features](#technical-features)

Written to show:

- Expo Dev Client and config plugins
- Expo and React Native Firebase integration
- Learn how to CRUD in React Native

For details on the Expo stuff, refer to their docs: [Dev Clients/Builds](https://docs.expo.dev/development/introduction/), [Config Plugins](https://docs.expo.dev/guides/config-plugins/), [React Native Firebase](https://rnfirebase.io/#expo).

![Screenshot](./Screenshots/scr.png)

## Requirements

- Expo CLI 5.x or newer
- Created Firebase project with Firestore database
  _(unless you use built-in fake API)_
- (Recommended) Yarn

## Installation

1. Clone Repo
2. `yarn install`
3. Set the `ios.bundleIdentifier` and `android.package` in `app.json` to your custom values, you'll need them in the next step.
4. Create a Firebase project and download Google Services config files
   - Put `google-services.json` in the root directory
     See docs [here](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials)
     for Android
   - Put `GoogleService-Info.plist` in the root directory.
     See docs [here](https://invertase.io/oss/react-native-firebase/quick-start/ios-firebase-credentials)
     for iOS
5. Run `yarn android` or `yarn ios`. It will build the Expo project, run the bundler and start the app in simulator.

### Running

`package.json` contains a few run scripts:

- `start` - Runs just Metro bundler for Expo Dev Client (`expo start --dev-client`)
- `android` - Builds Android project and runs it (Requires Android SDK) (`expo run:android`)
- `ios` - Builds iOS project and runs it (Requires Xcode) (`expo run:ios`)

#### Switching API

By default, the Firestore API is selected. To use the in-memory Fake API,
open `src/api/index.ts` and then

```typescript
const Api = new FakeApi();
//const Api = new FirestoreProductsApi();
```

uncomment the first line, and comment out the second one, as shown above.

## Used libraries and frameworks

- React Native
- Expo SDK 44 - semi-managed worflow - uses prebuild and config plugins
- React Navigation
- Native-base - for UI components
- Redux
- Redux Saga
- Firestore database
- React Native Firebase (Firestore, Analytics, Auth) - for native builds
- i18n-js for language support

## Technical features

- Two implementations of data management API: Firebase Firestore
  and simple in-memory dictionary based API for demo purposes. Interfaces
  needed to create custom implementation are provided.
- Support for event-driven APIs (for example Firestore `onSnapshot()`)
- Expo Dev Client + prebuilding / config plugins - uses React Native Firebase with Expo

## File structure

- `index.js` - React Native main file
- `App.tsx` - Expo main file. Redirects to `src/app.tsx`
- `firebase_credentials.json` - For Expo users - credentials
  to Firebase JS SDK
- `src` - App source code
- `src/App.tsx` - Main App component
- `src/api` - Product API interfaces and implementations
  - `Firestore` - Firestore API implementation
  - `Fake` - FakeApi - simple dictionary based in-memory API impl.
- `src/components` - React components
- `src/core` - Redux implementation files
  - `actions` - Redux Action definitions
  - `constants` - names and type names for actions
  - `reducers`
  - `sagas` - Side effects for actions.
    - `products.saga.ts` - Connects Redux actions and store with API
- `src/hooks` - custom React hooks
- `src/i18n` - Internalization / language support files
- `src/navigation` - React-navigation route and screen configuration
- `src/screens` - Navigation Screen component definitions
- `src/utils` - Common utility code
- `__tests__` - Unit tests for project

## TODO / Not yet implemented

- ~~Information message boxes is spamming too much about state~~
  but I think it's OK for demo purposes
