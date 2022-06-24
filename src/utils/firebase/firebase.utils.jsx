import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRidirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
    signOut,
onAuthStateChanged} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDOzXTfvsIQy5BOYS3AxVYjV2_9icwBu2Y",
  
    authDomain: "clothing-db-43a48.firebaseapp.com",
  
    projectId: "clothing-db-43a48",
  
    storageBucket: "clothing-db-43a48.appspot.com",
  
    messagingSenderId: "1029244768861",
  
    appId: "1:1029244768861:web:388c7920fb4bf52c8c33b4"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();
  googleprovider.getCustomParameters({ prompt:"select_account"})

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleprovider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth,additionalInformation)=>{
      if(!userAuth)return;
const userDocRef = doc(db,'users',userAuth.uid);
const userSnapshot = await getDoc(userDocRef);

if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef, {
            displayName, email,createdAt,...additionalInformation
        }          
            );

    }catch(error){
        console.log('error creating the user', error.message);
    }
    return userDocRef;
}
  };

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
     if(!email || !password) return;
     return await createUserWithEmailAndPassword(auth,email,password);
  };

  export const signInAuthUserWithEmailAndPassword= async (email,password)=>{
      if(!email || !password) return;
    return signInWithEmailAndPassword(auth,email,password);
  }

  export const signOutUser = async ()=> await signOut(auth);

  export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth,callback);