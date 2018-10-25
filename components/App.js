import React from 'react';
import Input from "../components/Input";
import Buttons from "../components/Buttons";
import {FlatList, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import CheckBox from "react-native-check-box";
import { FontAwesome } from '@expo/vector-icons';

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

    handleChangeStatus(status) {
        this.props.onChangeStatus(status);
    }

    handleClearCompleted() {
        this.props.onClearCompleted();
    }

    renderItem(item) {
        if (this.props.status !== "all" && this.props.status !== item.item.status) {
            return null;
        }

        return (
            <View style={[styles.row, styles.todoListItem]}>
                <View style={styles.leftContainer}>
                    <CheckBox
                        onClick={this.handleCheck.bind(this, item.item.key)}
                        isChecked={item.item.checked}
                    />
                    <Text style={[styles.text, styles.leftContainerText]}>{item.item.text}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableHighlight onPress={this.handleRemove.bind(this, item.item.key)}>
                        <FontAwesome name="remove" size={24} color="#cc9a9a" />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        const todos = this.props.todos;
        return (
            <View style={styles.container}>
                <Text style={[styles.headerText, styles.largeText]}>todos</Text>
                <Input
                    handleChange={this.handleChange.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    value={this.props.text}
                />
                <View>
                    <FlatList
                        data={todos}
                        extraData={this.props.status}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
                <Buttons
                    status={this.props.status}
                    handleChangeStatus={this.handleChangeStatus.bind(this)}
                    handleClearCompleted={this.handleClearCompleted.bind(this)}
                    todos={todos}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        padding: 50,
    },
    headerText: {
        alignSelf: "center",
        color: "rgba(175, 47, 47, 0.25)",
        fontWeight: "100",
        marginBottom: 20,
    },
    row: {
        height: 75,
        borderColor: '#e6e6e6',
        borderWidth: 1,
    },
    todoListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftContainer: {
        flexDirection: "row",
    },
    rightContainer: {
        paddingRight: 10,
    },
    leftContainerText: {
        marginLeft: 10,
    },
    largeText: {
        fontSize: 48,
    },
    text: {
        fontSize: 24,
    }
});

export default App;