import React from 'react';
import { connect } from 'react-redux';
import { changeText, submitText, remove, check, changeStatus } from "./reducers";
import {Button, FlatList, StyleSheet, Text, TextInput, View, TouchableHighlight} from "react-native";
import CheckBox from "react-native-check-box";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(text) {
        this.props.onInputChange(text);
    }

    handleSubmit() {
        this.props.onInputSubmit();
    }

    handleRemove(key) {
        this.props.onRemove(key);
    }

    handleCheck(key) {
        this.props.onCheck(key);
    }

    renderItem(item) {
        console.log("action, this.props.status, item.item.status", this.props.status, item.item.status);
        if (this.props.status !== "all" && this.props.status !== item.item.status) {
            return null;
        }

        return (
            <View style={[styles.row, styles.childrenHorizontaly]}>
                <CheckBox
                    onClick={this.handleCheck.bind(this, item.item.key)}
                    isChecked={item.item.checked}
                />
                <Text style={styles.text}>{item.item.text}</Text>
                <Button
                    onPress={this.handleRemove.bind(this, item.item.key)}
                    title="remove"
                    color="#841584"
                />
            </View>
        );
    }

    handleChangeStatus(status) {
        this.props.onChangeStatus(status);
    }

    render() {
        console.log("action-render", this.props.status);
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
                <View style={[styles.row, styles.childrenHorizontaly]}>
                    <Text style={styles.smallText}>1 item left</Text>
                    <View style={styles.childrenHorizontaly}>
                        <TouchableHighlight onPress={this.handleChangeStatus.bind(this, "all")}>
                            <Text>All</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.handleChangeStatus.bind(this, "active")}>
                            <Text>Active</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.handleChangeStatus.bind(this, "completed")}>
                            <Text>Completed</Text>
                        </TouchableHighlight>
                    </View>
                </View>
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
    childrenHorizontaly: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 24,
    },
    smallText: {
        fontSize: 14,
    }
});

const mapStateToProps = state => {
    console.log("action-mapStateToProps, state.status", state.status)
    return {
        todos: state.todos,
        text: state.text,
        status: state.status,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: text => {
            dispatch(changeText(text));
        },
        onInputSubmit: data => {
            dispatch(submitText());
        },
        onRemove: key => {
            dispatch(remove(key));
        },
        onCheck: key => {
            dispatch(check(key));
        },
        onChangeStatus: status => {
            dispatch(changeStatus(status));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);