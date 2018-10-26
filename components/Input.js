import {StyleSheet, TextInput, View} from "react-native";
import React from "react";

const Input = (props) => {
    return (
        <View style={styles.input}>
            <TextInput
                style={styles.text}
                onChangeText={props.handleChange}
                onSubmitEditing={props.handleSubmit}
                value={props.value}
                placeholder="What needs to be done"
            />
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 75,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 24,
    },
});

export default Input;