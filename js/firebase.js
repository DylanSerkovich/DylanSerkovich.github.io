// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuQEfYL2Th7QdPYVedp8uGGK4cYVu4RLo",
  authDomain: "portafolio-42187.firebaseapp.com",
  projectId: "portafolio-42187",
  storageBucket: "portafolio-42187.appspot.com",
  messagingSenderId: "781168527557",
  appId: "1:781168527557:web:e04a0c7006fbb313c408ac",
  measurementId: "G-K46WCRTZHK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const getSkills = () => getDocs(collection(db, 'skills'));

export const getProjects = () => getDocs(collection(db, 'projects'));

export const sendMessage = async (messageData) => {
  const message = {
    ...messageData,
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'messages'), message);
    return { success: true, message: "Mensaje enviado con éxito" };
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return { success: false, message: error.message };
  }

}