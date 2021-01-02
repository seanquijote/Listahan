import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './colors';
import tempData from './tempData';

export default class AddListModal extends React.Component {
    backgroundColors = ["green", "#5AA9E6", "indigo", "purple", "magenta", "#F08080", "orange"];

    state = {
        name: "",
        color: this.backgroundColors[0]
    }

    createTodo = () => {
        const { name, color } = this.state;

        // tempData.push({ name, color, todos: [] });
        const list = { name, color }
        this.props.addList(list);

        this.setState({ name: "" });
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding": "height"}>
                <TouchableOpacity style={{ position: "absolute", top: 26, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create To Do List</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="List name?" 
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.createTodo}>
                        <Text style={{ color: colors.white, fontWeight: "600" }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "center"
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});