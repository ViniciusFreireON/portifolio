// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyBrLTQjbS61Xcx88RC-cuc00IcRL0Ic8zY",
  authDomain: "portifolio-bd55b.firebaseapp.com",
  projectId: "portifolio-bd55b",
  storageBucket: "portifolio-bd55b.appspot.app", // corrigido o final
  messagingSenderId: "650004430026",
  appId: "1:650004430026:web:4ed8401ec96bbfa6484833",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore (Banco de Dados)
const db = getFirestore(app);

export { db };
