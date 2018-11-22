import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImagePicker from "react-native-image-picker";
import {Button, Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import api from "../api";


class AddMenu extends Component {
    state = {
        name: null,
        parts: ["alksjdf"],
        picture: null,
    };
    option = {
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '相册',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    _pickImage = () => {
        ImagePicker.showImagePicker(this.option, (response) => {
            if (response.didCancel) {
                console.log("User cancel to pick a image")
            } else {
                this.setState({
                    picture: response.uri
                })
            }
        })
    };
    _submitMenu = () => {
        let formData = new FormData();
        let picFile = {uri: this.state.picture, name: 'image.jpg', type: 'multipart/form-data'};
        formData.append("name", this.state.name);
        formData.append("file", picFile);
        this.state.parts.forEach((part) => {
            formData.append("parts", part);
        });

        console.log(formData);

        fetch(api.menuApi, {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    };


    render() {
        console.log(this.state.parts);
        return (
            <View>
                {this.state.picture ?
                    <TouchableOpacity onPress={this._pickImage}>
                        <Image style={{width: 150, height: 150}} source={{uri: this.state.picture}}/>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={this._pickImage}>
                        <Text>Add Picture</Text>
                    </TouchableOpacity>
                }
                <TextInput style={styles.partsInput}
                           editable={true}
                           maxLength={40}
                           onSubmitEditing={(event) => {
                               const text = event.nativeEvent.text;
                               this.setState((prevState) => {
                                   return {
                                       name: text
                                   }
                               })
                           }}/>

                <TextInput style={styles.partsInput}
                           editable={true}
                           maxLength={40}
                           onSubmitEditing={(event) => {
                               const text = event.nativeEvent.text;
                               this.setState((prevState) => {
                                   return {
                                       parts: [text, ...prevState.parts]
                                   }
                               })
                           }}/>


                {this.state.parts.map((p, i) => {
                    return <Text key={i}>{p}</Text>
                })}
                <Button title="submit" onPress={this._submitMenu}>submit</Button>
            </View>
        );
    }
}

AddMenu.propTypes = {};

export default AddMenu;

const styles = StyleSheet.create({
    partsInput: {
        height: 20,
        borderColor: 'gray',
        borderWidth: 1
    }
})