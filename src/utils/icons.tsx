
import {Ionicons} from "@expo/vector-icons";
import React from "react";

//My workaround for repeatable code
//https://reactnavigation.org/docs/en/tab-based-navigation.html
export const IosIcon = (name: string) => {
    return (props) => (
        <Ionicons name={name} {...props} />
    );
};