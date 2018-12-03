/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import MenuList from "./component/MenuList";
import { createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import AddMenu from "./component/AddMenu";
import MenuDetail from "./component/MenuDetail"


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


const ListStackNavigator = createStackNavigator({
    ListMenu: MenuList,
    MenuDetail: MenuDetail,
});

const AddMenuStackNavigator = createStackNavigator({
    AddMenu: AddMenu,
});

const TabNavigator = createBottomTabNavigator({
    Home: ListStackNavigator,
    AddMenu: AddMenuStackNavigator,
});


const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {

    render() {
        return <AppContainer />
    }
}