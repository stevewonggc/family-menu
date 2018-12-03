import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, FlatList, StyleSheet} from "react-native";
import api from "../api";
import Menu from "./Menu";
import MenuDetail from "./MenuDetail";
import { createStackNavigator, createAppContainer } from 'react-navigation';



class MenuList extends Component {

    state = {
        menuList: [],
        currentMenu: null
    };

    showMenuDetail = (menu) => {
        this.props.navigation.navigate("MenuDetail", {menu: menu});
    };

    componentDidMount() {
        fetch(api.menuApi).then((response) => {
            return response.json();
        }).then((responseJson) => {
            this.setState({
                menuList: responseJson.content
            });
        }).catch((ex) => {
            console.log(ex);
        })
    }


    render() {
        console.log(this.state.menuList);
        // if (this.state.currentMenu) {
        //     return <MenuDetail menu={this.state.currentMenu}/>
        // } else {
            return this.state.menuList.length === 0 ? (<View style={styles.head}><Text style={styles.title}>{"还没有菜谱~~~~(>_<)~~~~"}</Text></View>) :
                <FlatList 
                          data={this.state.menuList}
                          renderItem={({item}) => <Menu menu={item} onPress={this.showMenuDetail}/>}
                />;
        // }
    }
};

const styles = StyleSheet.create({
    head: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20
    }
});

MenuList.propTypes = {};

export default MenuList;