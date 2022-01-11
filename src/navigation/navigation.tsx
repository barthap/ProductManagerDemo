import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductListScreen } from '../screens/ProductListScreen';
import { StyleSheet } from 'react-native';
import { DetailsScreen } from '../screens/DetailsScreen';
import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { AboutScreen } from '../screens/AboutScreen';
import { IosIcon } from '../utils/icons';
import { AddProductScreen } from '../screens/AddProductScreen';
import { Icon } from 'native-base';
import { EditProductScreen } from '../screens/EditProductScreen';
import { Nav, RootStackParamList } from './routeNames';
import analytics from '@react-native-firebase/analytics';
import i18n from '../i18n';
import { typedUseSelector } from '../hooks/typedUseSelector';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

//Navigation component for Products tab
const ProductStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Nav.ProductList}
      component={ProductListScreen}
      options={({ navigation }) => ({
        title: i18n.t('title.list'),
        headerRight: ({ tintColor }) => (
          <Icon
            name="ios-add"
            style={styles.icon}
            color={tintColor}
            onPress={() => navigation.navigate(Nav.Add)}
          />
        ),
      })}
    />
    <Stack.Screen
      name={Nav.Details}
      component={DetailsScreen}
      options={({ route }) => ({
        title: route.params.product.name,
      })}
    />
    <Stack.Screen
      name={Nav.Edit}
      component={EditProductScreen}
      options={({ route }) => ({
        title: i18n.t('title.edit', { name: route.params.product.name }),
      })}
    />
    <Stack.Screen
      name={Nav.Add}
      component={AddProductScreen}
      options={{ title: i18n.t('title.add'), presentation: 'modal' }}
    />
  </Stack.Navigator>
);

function NavigationMain() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Products"
        component={ProductStackScreen}
        options={{
          tabBarIcon: icons.products,
          title: i18n.t('menu.products'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: icons.profile,
          title: i18n.t('menu.profile'),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: icons.about,
          title: i18n.t('menu.about'),
        }}
      />
    </Tab.Navigator>
  );
}

function NavigationAuth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Nav.Login} component={LoginScreen} />
      <Stack.Screen name={Nav.Register} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigation() {
  const routeNameRef = React.useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const handleStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name || 'Unknown';

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
        previous_screen_name: previousRouteName,
      });
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };

  const onReady = React.useCallback(() => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name || 'Unknown';
  }, [navigationRef]);

  const authState = typedUseSelector((state) => state.auth);

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={handleStateChange}>
      {authState.isLoggedIn ? <NavigationMain /> : <NavigationAuth />}
    </NavigationContainer>
  );
}

//icons available: https://expo.github.io/vector-icons/
const icons = {
  products: IosIcon('ios-cube'),
  profile: IosIcon('ios-person'),
  about: IosIcon('ios-bulb'),
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 15,
  },
});
