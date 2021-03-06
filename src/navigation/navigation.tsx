import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ProductListScreen} from "../screens/ProductListScreen";
import {StyleSheet} from "react-native";
import {DetailsScreen} from "../screens/DetailsScreen";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {AboutScreen} from "../screens/AboutScreen";
import {IosIcon} from "../utils/icons";
import {AddProductScreen} from "../screens/AddProductScreen";
import {Icon} from "native-base";
import {EditProductScreen} from "../screens/EditProductScreen";
import {Nav, RootStackParamList} from "./routeNames";
import analytics from '@react-native-firebase/analytics';
import {NavigationState} from "@react-navigation/routers";
import {Constants} from "react-native-unimodules";
import {AppOwnership} from "expo-constants";
import i18n from "../i18n";


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

//Navigation component for Products tab
const ProductStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name={Nav.ProductList}
                      component={ProductListScreen}
                      options={({navigation}) => ({
                          title: i18n.t('title.list'),
                          headerRight: ({tintColor}) => (
                              <Icon name="ios-add"
                                    style={styles.icon}
                                    color={tintColor}
                                    onPress={() => navigation.navigate(Nav.Add)}/>
                          )
                      })}/>
        <Stack.Screen name={Nav.Details}
                      component={DetailsScreen}
                      options={({route}) => ({
                                title: route.params.product.name
                      })}/>
        <Stack.Screen name={Nav.Edit}
                      component={EditProductScreen}
                      options={({route}) => ({
                          title: i18n.t('title.edit', { name: route.params.product.name })
                      })}/>
        <Stack.Screen name={Nav.Add}
                      component={AddProductScreen}
                      options={{ title: i18n.t('title.add') }}/>
    </Stack.Navigator>
);

export function NavigationStack() {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    const handleStateChange = (state: NavigationState) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        //don't track screens for Expo Client - Firebase Web SDK doesn't support it
        if (previousRouteName !== currentRouteName && Constants.appOwnership !== AppOwnership.Expo)
            analytics().setCurrentScreen(currentRouteName, currentRouteName);

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
    };

    return (<NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
        <Tab.Navigator>
            <Tab.Screen name="Products"
                        component={ProductStackScreen}
                        options={{
                            tabBarIcon: icons.products,
                            title: i18n.t('menu.products')
                        }}/>
            <Tab.Screen name="About"
                        component={AboutScreen}
                        options={{
                            tabBarIcon: icons.about,
                            title: i18n.t('menu.about')
                        }}/>
        </Tab.Navigator>
    </NavigationContainer>);
}


// Gets the current screen from navigation state
function getActiveRouteName(state: NavigationState | Partial<NavigationState>) {
    const route = state.routes[state.index];

    if (route.state)
        // Dive into nested navigators
        return getActiveRouteName(route.state);

    return route.name;
}

//icons available: https://expo.github.io/vector-icons/
const icons = {
    products: IosIcon('ios-cube'),
    about: IosIcon('ios-bulb')
};

const styles = StyleSheet.create({
    icon: {
        paddingRight: 15,
    }
});
