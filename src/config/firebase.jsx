import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, doc, getDocs, getFirestore, query, getDoc, where, setDoc, updateDoc } from 'firebase/firestore'
import { config } from './config';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import VerifyErroCode from './VerifyErroCode'

// Initialize Firebase
const app = initializeApp(config);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);


//Login user and senha
const logInWithEmailAndPassword = async (email, password, setResponse) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    setResponse({
      status: 200,
      message: "Sucesso!",
    });
  } catch (e) {
    setResponse({
      status: 400,
      message: VerifyErroCode(e.code),
    });
  }
};


const checkIfEmailExists = async (email) => {
  const q = query(collection(db, 'usuarios'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retorna true se o email já existir
};

const checkIfCpfExists = async (cpf) => {
  const q = query(collection(db, 'usuarios'), where('cpf', '==', cpf));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retorna true se o cpf já existir
};

//Cadastramento
const registerWithEmailAndPassword = async (nome, email, password, cpf, setResponse) => {
  try {
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      setResponse({
        status: 400,
        message: "O e-mail já está cadastrado no sistema.",
      });
      return;
    }

    const cpfExists = await checkIfCpfExists(cpf);
    if (cpfExists) {
      setResponse({
        status: 400,
        message: "O CPF já está cadastrado no sistema.",
      });
      return;
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      authProvider: 'local',
      uid: user.uid,
      cpf: cpf,
      nome: nome,
      email: email,
      isAdmin: false,
    });

    await updateProfile(auth.currentUser, { displayName: nome });

    setResponse({
      status: 200,
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (e) {
    setResponse({
      status: 400,
      message: e.message,
    });
  }
};

const sendPasswordReset = async (email, setResponse) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setResponse({
      status: 200,
      message: `O link para redefinição de senha foi enviado para ${email}. Por favor, verifique a sua caixa de entrada e siga as instruções fornecidas para concluir o processo de redefinição da senha.`,
    });
  } catch (e) {
    setResponse({
      status: 400,
      message: VerifyErroCode(e.code),
    });
  }
};


export {
  db,
  auth,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
};