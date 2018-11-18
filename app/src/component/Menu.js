import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, Text, StyleSheet} from "react-native";

class Menu extends Component {
    render() {
        const {name, url, parts} = this.props.menu;
        return (
            <TouchableOpacity style={styles.touchableContainer}>
                <Image style={styles.image} source={{uri: url}}/>
                <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
    },
    touchableContainer: {
        flex: 1,
        borderColor: '#bbb',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        shadowColor: '#888',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        margin: 5,
        shadowOffset: {width: 0, height: 2},
        marginVertical: 5,
        backgroundColor: '#eee'
    },
    title: {
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'PingFang HK',
        paddingRight: 10
    }
});

Menu.propTypes = {
    menu: PropTypes.object.required
};

export default Menu;