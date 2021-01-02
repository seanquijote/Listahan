/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './components/colors';
import tempData from './components/tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModel';
import Fire from "./components/Fire";

// const App: () => React$Node = () => {
export default class App extends React.Component{
	state = {
		addTodoVisible: false,
		// lists: tempData,
		lists: [],
		user: {},
		loading: true
	}

	componentDidMount() {
		firebase = new Fire((error, user) => {
			if (error) {
				console.error(error);

				switch (error.code) {
					case "auth/network-request-failed":
						return alert("No network connection detected.")
						break;
					default:
						return alert("Uh oh, something went wrong.")
						break;
				}
			}

			firebase.getLists((lists) => {
				this.setState({ lists, user }, () => {
					this.setState({ loading: false })
				});
			});

			this.setState({ user });
		});
	}

	componentWillUnmount() {
		firebase.detach();
	}

	toggleAddTodoModal() {
		this.setState({ addTodoVisible: !this.state.addTodoVisible })
	}

	renderList = (list) => { 
		return <TodoList list={list} updateList={this.updateList} />
	}

	addList = (list) => {
		// this.setState({ 
		// 	lists: [
		// 		...this.state.lists, 
		// 		{ ...list, id: this.state.list.length + 1, todos: [] }
		// 	] 
		// });

		firebase.addList({
			name: list.name,
			color: list.color,
			todos: []			
		})
	}

	updateList = (list) => {
		// this.setState({
		// 	lists: this.state.lists.map(item => {
		// 		return item.id === list.id ? list : item;
		// 	})
		// });

		firebase.updateList(list);
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={colors.blue} />
				</View>
			);
		}

    	return (
			<View style={styles.container}>
				<Modal 
					animationType="slide" 
					visible={this.state.addTodoVisible} 
					onRequestClose={() => this.toggleAddTodoModal()}
				>
					<AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
				</Modal>

				{/* <View>
					<Text>User: {this.state.user.uid}</Text>
				</View> */}

				<View style={{ flexDirection: "row" }}>
					<View style={styles.divider} />
					<Text style={styles.title}>
						List<Text style={{ color: colors.blue }}>ahan</Text>
					</Text>
					<View style={styles.divider} />
				</View>
				<View>
					<Text style={styles.sub}>"Don't let your dreams be dreams."</Text>
				</View>

				<View style={{ marginVertical: 48 }}>
					<TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()} >
						<AntDesign name="plus" size={16} color={colors.blue} />
					</TouchableOpacity>

					<Text style={styles.add}>Add List</Text>
				</View>

				<View style={styles.todoItems}>
					<FlatList 
						data={this.state.lists}
						keyExtractor={item => item.id.toString()}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => this.renderList(item)}
						keyboardShouldPersistTaps="always"
					/>
				</View>
			</View>
    	);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "center"
	},
	divider: {
		backgroundColor: colors.lightBlue,
		height: 1,
		flex: 1,
		alignSelf: "center"
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: colors.black,
		paddingHorizontal: 16
	},
	sub: {
		fontSize: 12,
		fontWeight: "200",
		color: colors.blue,
	},
	addList: {
		borderWidth: 2,
		borderColor: colors.lightBlue,
		borderRadius: 4,
		padding: 16,
		alignItems: "center",
		justifyContent: "center"
	},
	add: {
		color: colors.blue,
		fontWeight: "600",
		fontSize: 14,
		marginTop: 8
	},
	todoItems: {
		height: 275, 
		paddingLeft: 20,
	}
});

// export default App;