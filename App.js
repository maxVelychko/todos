import React from 'react';
import { connect } from 'react-redux';
import { changeText, submitText, remove, check, changeStatus, clearCompleted } from "./reducers";
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

    handleClearCompleted() {
        this.props.onClearCompleted();
    }

    render() {
        const todos = this.props.todos;
        const itemsLeft = todos.filter(todo => todo.status === "active").length;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TextInput
                        style={styles.text}
                        onChangeText={this.handleChange.bind(this)}
                        onSubmitEditing={this.handleSubmit.bind(this)}
                        value={this.props.text}
                        placeholder="type here"
                    />
                </View>
                <View>
                    <FlatList
                        data={todos}
                        extraData={this.props.status}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
                <View style={[styles.row]}>
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
                    <View style={styles.childrenHorizontaly}>
                        <View>
                            {itemsLeft ?
                                (
                                    <Text style={styles.smallText}>
                                        {`${itemsLeft} ${itemsLeft > 1 ? "items" : "item"} left`}
                                    </Text>
                                ) : null
                            }
                        </View>
                        <View>
                            {todos.length > itemsLeft ?
                                (
                                    <TouchableHighlight onPress={this.handleClearCompleted.bind(this)}>
                                        <Text>Clear Completed</Text>
                                    </TouchableHighlight>
                                ) : null
                            }
                        </View>
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
        justifyContent: 'flex-start',
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
        onInputSubmit: () => {
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
        onClearCompleted: () => {
            dispatch(clearCompleted());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);