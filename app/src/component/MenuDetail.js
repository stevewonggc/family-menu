import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import PropTypes from 'prop-types';



class MenuDetail extends Component {
    render() {
        const {url, name, parts} = this.props.menu;
        return (
            <View>
                <Image style={styles.image} source={{uri: url}}/>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.parts}>{parts.reduce((s1, s2) => {
                    return s1 + ', ' + s2
                })}</Text>
            </View>
        );
    }
}

export default MenuDetail;

MenuDetail.propTypes = {
    menu: PropTypes.object.required
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    parts: {
        fontSize: 20,
        textAlign: 'center'
    }
});