import React from 'react';
import { connect } from 'react-redux';
import { changeText, submitText } from "./reducers";
import {Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(text) {
        this.props.onInputChange(text);
    }

    handleSubmit() {
        // console.log("action in hSubmit, this.props.text", this.props.text)
        this.props.onInputSubmit();
    }

    handleRemove(key) {
        /*const items = [...this.state.items];
        for(let i = 0; i < items.length; i++) {
            if (items[i].key === key) {
                items.splice(i, 1);
                break;
            }
        }

        this.setState({
            items: [...items],
        });*/
    }

    renderItem(item) {
        return (
            <View style={[styles.row, styles.listItem]}>
                <Text style={styles.text}>{item.item.text}</Text>
                <Button
                    onPress={this.handleRemove.bind(this, item.item.key)}
                    title="remove"
                    color="#841584"
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.row, styles.text]}
                    onChangeText={this.handleChange.bind(this)}
                    onSubmitEditing={this.handleSubmit.bind(this)}
                    value={this.props.text}
                    placeholder="type here"
                />
                <FlatList
                    data={this.props.todos}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'stretch',
        padding: 50,
    },
    row: {
        height: 75,
        borderColor: '#e6e6e6',
        borderWidth: 1,
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 25,
    }
});

const mapStateToProps = state => {
    return {
        todos: state.todos,
        text: state.text,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: text => {
            dispatch(changeText(text))
        },
        onInputSubmit: data => {
            dispatch(submitText())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);