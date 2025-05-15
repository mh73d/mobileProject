import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlvVJubCKOWZgqm6DxAY2UMpMLgVTxZtg",
  authDomain: "native-3b1eb.firebaseapp.com",
  databaseURL: "https://native-3b1eb-default-rtdb.firebaseio.com",
  projectId: "native-3b1eb",
  storageBucket: "native-3b1eb.firebasestorage.app",
  messagingSenderId: "376419126764",
  appId: "1:376419126764:web:d2c86d44df72696865c4c9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };