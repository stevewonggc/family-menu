import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import PropTypes from 'prop-types';



class MenuDetail extends Component {
    render() {
        const {navigation} = this.props;
        console.log("==menuDetail===", navigation);
        
        const {url, name, parts} = navigation.getParam('menu', null);
        // const {url, name, parts} = {url : "http://www.baidu.com", name : "name", parts: ["ad", "sdklf"]}
        return (
            <View style={styles.menuDetailView}>
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
    menu: PropTypes.object.required,
};

const styles = StyleSheet.create({
    menuDetailView: {
        flex: 1,
        width: '100%'
    },
    image: {
        width: '100%',
        height: 200,

    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15
    },
    parts: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 15
    }
});