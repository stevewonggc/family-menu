import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, FlatList, StyleSheet} from "react-native";
import api from "../api";
import Menu from "./Menu";
import MenuDetail from "./MenuDetail";


class MenuList extends Component {

    state = {
        menuList: [],
        currentMenu: null
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
        if (this.state.currentMenu) {
        } else {
            return this.state.menuList.length === 0 ? (<Text>{"empty"}</Text>) :
                <FlatList style={styles.list}
                          data={this.state.menuList}
                          renderItem={({item}) => <MenuDetail menu={item}/>}
                />;
        }
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
    }
});

MenuList.propTypes = {};

export default MenuList;