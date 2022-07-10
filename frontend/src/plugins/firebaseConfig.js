import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMesgoLFGrA_zGEigBAjRrrQJX3gz3u8U",
  authDomain: "atema-develop.firebaseapp.com",
  projectId: "atema-develop",
  storageBucket: "atema-develop.appspot.com",
  messagingSenderId: "989268744397",
  appId: "1:989268744397:web:d1c3ca42c1f890c9d0b184",
  measurementId: "G-8CSW1RXBQ2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
