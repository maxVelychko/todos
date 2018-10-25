import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React from "react";

const Buttons = (props) => {
    const itemsLeft = props.todos.filter(todo => todo.status === "active").length;
    return (
        <View style={styles.buttonsContainer}>
            <View style={styles.row}>
                <TouchableHighlight
                    style={props.status === "all" ? styles.selected : null}
                    onPress={props.handleChangeStatus.bind(null, "all")}
                >
                    <Text>All</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={props.status === "active" ? styles.selected : null}
                    onPress={props.handleChangeStatus.bind(null, "active")}
                >
                    <Text>Active</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={props.status === "completed" ? styles.selected : null}
                    onPress={props.handleChangeStatus.bind(null, "completed")}
                >
                    <Text>Completed</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <View>
                    {itemsLeft ?
                        (
                            <Text style={[styles.smallText]}>
                                {`${itemsLeft} ${itemsLeft > 1 ? "items" : "item"} left`}
                            </Text>
                        ) : null
                    }
                </View>
                <View>
                    {props.todos.length > itemsLeft ?
                        (
                            <TouchableHighlight onPress={props.handleClearCompleted}>
                                <Text>Clear Completed</Text>
                            </TouchableHighlight>
                        ) : null
                    }
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttonsContainer: {
        height: 75,
        borderColor: '#e6e6e6',
        borderWidth: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    selected: {
        borderWidth: 1,
        borderColor: "rgba(175, 47, 47, 0.2)",
    },
    smallText: {
        fontSize: 14,
    }
});

export default Buttons;