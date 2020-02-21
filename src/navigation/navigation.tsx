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


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

//Navigation component for Products tab
const ProductStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name={Nav.ProductList}
                      component={ProductListScreen}
                      options={({navigation}) => ({
                          title: "Product List",
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
                          title: 'Edit ' + route.params.product.name
                      })}/>
        <Stack.Screen name={Nav.Add}
                      component={AddProductScreen}
                      options={{ title: "Add Product" }}/>
    </Stack.Navigator>
);

export function NavigationStack() {
    return (<NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Products"
                        component={ProductStackScreen}
                        options={{
                            tabBarIcon: icons.products
                        }}/>
            <Tab.Screen name="About"
                        component={AboutScreen}
                        options={{
                            tabBarIcon: icons.about
                        }}/>
        </Tab.Navigator>
    </NavigationContainer>);
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
})
