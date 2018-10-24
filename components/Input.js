import {TextInput, View} from "react-native";
import React from "react";

const Input = (props) => {
    return (
        <View style={props.styles.row}>
            <TextInput
                style={props.styles.text}
                onChangeText={props.handleChange}
                onSubmitEditing={props.handleSubmit}
                value={props.value}
                placeholder="type here"
            />
        </View>
    )
};

export default Input;