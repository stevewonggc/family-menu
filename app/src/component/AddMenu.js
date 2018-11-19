import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImagePicker from "react-native-image-picker";
import {Image, TextInput, TouchableOpacity, View, Text} from "react-native";


class AddMenu extends Component {
    state = {
        name: null,
        parts: ["alksjdf"],
        picture: null,
    };

    render() {
        console.log(this.state.parts);
        return (
            <View>
                <Text>Hello World</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    editable={true}
                           maxLength={40}
                           onSubmitEditing={(event) => {
                               const text = event.nativeEvent.text
                               this.setState((prevState) => {return {
                                       parts: [text, ...prevState.parts]
                               }})
                           }}/>

                {this.state.parts.map((p, i) => {return <Text key={i}>{p}</Text>})}
                <Text>sdfasdf</Text>
            </View>
        );
    }
}

AddMenu.propTypes = {};

export default AddMenu;