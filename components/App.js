import React from 'react';
import Input from "../components/Input";
import Buttons from "../components/Buttons";
import {FlatList, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import { CheckBox } from 'react-native-elements'
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
            <View style={styles.todoListItem}>
                <View style={styles.itemLeftContainer}>
                    <CheckBox
                        checked={item.item.checked}
                        onPress={this.handleCheck.bind(this, item.item.key)}
                        containerStyle={styles.checkbox}
                    />
                    <Text style={styles.itemleftContainerText}>{item.item.text}</Text>
                </View>
                <View>
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
                <Text style={styles.header}>todos</Text>
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
        backgroundColor: '#f5f5f5',
        padding: 50,
    },
    header: {
        alignSelf: "center",
        color: "rgba(175, 47, 47, 0.25)",
        fontWeight: "100",
        marginBottom: 20,
        fontSize: 48,
    },
    todoListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 75,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    itemLeftContainer: {
        flex: 0.8,
        flexDirection: "row",
        alignItems: "center",
    },
    itemleftContainerText: {
        fontSize: 24,
    },
    checkbox: {
        backgroundColor: "#f5f5f5",
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
        margin: 0,
        borderWidth: 0,
        borderRadius: 0,
    },
});

export default App;