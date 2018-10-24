import {Text, TouchableHighlight, View} from "react-native";
import React from "react";

const Input = (props) => {
    const itemsLeft = props.todos.filter(todo => todo.status === "active").length;
    return (
        <View style={props.styles.row}>
            <View style={props.styles.childrenHorizontaly}>
                <TouchableHighlight onPress={props.handleChangeStatus.bind(null, "all")}>
                    <Text>All</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.handleChangeStatus.bind(null, "active")}>
                    <Text>Active</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.handleChangeStatus.bind(null, "completed")}>
                    <Text>Completed</Text>
                </TouchableHighlight>
            </View>
            <View style={props.styles.childrenHorizontaly}>
                <View>
                    {itemsLeft ?
                        (
                            <Text style={props.styles.smallText}>
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

export default Input;