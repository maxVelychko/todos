import React from 'react';
import Input from "../components/Input";
import Buttons from "../components/Buttons";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
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

    render() {
        const todos = this.props.todos;
        return (
            <View style={styles.container}>
                <Input
                    handleChange={this.handleChange.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    value={this.props.text}
                    styles={styles}
                />
                <View>
                    <FlatList
                        data={todos}
                        extraData={this.props.status}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
                <Buttons
                    handleChangeStatus={this.handleChangeStatus.bind(this)}
                    handleClearCompleted={this.handleClearCompleted.bind(this)}
                    todos={todos}
                    styles={styles}
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

export default App;