import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { SAMPLE_KEY } from "@env";
  
const config = {
    name: "Listahan",
};

class Fire {
    constructor(callback) {
        firebase.firestore.setLogLevel("debug");
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            });

            callback(lists);
        })
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;