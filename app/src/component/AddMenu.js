import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImagePicker from "react-native-image-picker";
import {Button, Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import api from "../api";
import debounce from 'lodash.debounce';


class AddMenu extends Component {
    state = {
        name: null,
        parts: [],
        picture: null,
        editname: true,
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
        this.props.navigation.navigate('Home', {refresh: true});
    };

    _editName = () => {
        this.setState({
            editname: true
        })
    };

    _onNameInput = debounce((text) => {
        this.setState({
            name: text
        })
    }, 1000);


    render() {
        return (
            <View style={styles.addMenuContainer}>
                {this.state.picture ?
                    <TouchableOpacity onPress={this._pickImage} style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: this.state.picture}}/>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={this._pickImage} style={styles.imagePlaceHolder}>
                        <Text style={styles.addPicture}>Add Picture</Text>
                    </TouchableOpacity>
                }
                <View style={styles.nameView}>
                    <Text>菜名: </Text>
                    {
                        this.state.editname ?
                            <TextInput style={styles.partsInput}
                                       editable={true}
                                       maxLength={40}
                                       defaultValue={this.state.name}
                                       onChangeText={(text) => {
                                           this._onNameInput(text)
                                       }}/> :
                            <TouchableOpacity onPress={this._editName}>
                                <Text>{this.state.name}</Text>
                            </TouchableOpacity>
                    }
                </View>
                <View style={styles.partsView}>
                    <Text>配料: {this.state.parts.length > 0 ? this.state.parts.reduce((a, b) => a + ", " + b) : ""}</Text>
                    <TextInput style={styles.partsInput}
                               editable={true}
                               maxLength={40}
                               ref="input"
                               onSubmitEditing={(event) => {
                                   const text = event.nativeEvent.text;
                                   if(text.indexOf(" ") >= 0) {

                                   }
                                   this.refs.input.clear();
                                   this.setState((prevState) => {
                                       return {
                                           parts: [...text.split("，"), ...prevState.parts]
                                       }
                                   })
                               }}/>
                </View>

                <Button title="submit" onPress={this._submitMenu}>submit</Button>
            </View>
        );
    }
}

AddMenu.propTypes = {};

export default AddMenu;

const styles = StyleSheet.create({
    addMenuContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start'
    },
    nameView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    partsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        flexWrap: 'wrap'
    },
    partsInput: {
        marginHorizontal: 3,
        height: 20,
        borderColor: '#eee',
        borderWidth: 1,
        width: 80,
        textAlign: 'center'
    },
    imageContainer: {
        marginHorizontal: 15,
        marginBottom: 15,
        height: 200,
    },
    imagePlaceHolder: {
        justifyContent: 'center',
        marginHorizontal: 15,
        borderColor: 'gray',
        borderWidth: 5,
        borderStyle: 'dashed',
        height: 200,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200
    },
})