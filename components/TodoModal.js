import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native';
import colors from './colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

export default class TodoModal extends React.Component {
    state = {
        newTodo: ""
    }

    toggleTodoCompleted = (index) => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    addTodo = () => {
        let list = this.props.list;
        list.todos.push({ title: this.state.newTodo, completed: false });

        this.props.updateList(list);
        this.setState({ newTodo: "" })

        Keyboard.dismiss();
    }

    rightActions = (dragX, index) => {
        return (
            <TouchableOpacity>
                <Animated.View style={styles.deleteBtn}>
                    <Animated.Text>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    renderTodo = (todo, index) => {
        return (
            <Swipeable
                onSwipeableLeftOpen={() => console.log('Swiped Leftt')}
                onSwipeableRightOpen={() => console.log('Swiped right')} 
                renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
            >
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <MaterialIcons 
                            name={todo.completed ? "check-box" : "check-box-outline-blank"}
                            size={24}
                            color={colors.gray}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Text
                            style={[
                                styles.todo, 
                                { 
                                    textDecorationLine: todo.completed ? "line-through" :  "none",
                                    color: todo.completed ? colors.gray : colors.black
                                }
                            ]}
                        >
                            {todo.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        );
    }

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding": "height"}>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity 
                        style={{ position: "absolute", top:  26, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal} 
                    >
                        <AntDesign name="close" size={24} color={colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList 
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index) }
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={text => this.setState({ newTodo: text })} value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80
    }
});