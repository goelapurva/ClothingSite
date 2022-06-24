import { createContext,useState,useEffect } from "react";
import { onAuthStateChangedListener ,createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

//1st piece to store value
export const UserContext = createContext({

    currentUser:null,
    setCurrentUser: ()=>null,

});
//2nd piece - to pass into provider

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser ] = useState(null);
    const value = {currentUser,setCurrentUser};
    
    useEffect(()=>{
       const unsubscribe =  onAuthStateChangedListener((user)=>{
           if(user){
            createUserDocumentFromAuth(user);
           }
        setCurrentUser(user);
           console.log(user)
        })
        return unsubscribe;
    },[]);
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}