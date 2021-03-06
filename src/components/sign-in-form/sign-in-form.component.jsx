
import {useState} from 'react';
import {createUserDocumentFromAuth, signInWithGooglePopup,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component.jsx';
import './sign-in-form.styles.scss';
import Button , {BUTTON_TYPE} from '../button/button.component';


const defaultFormFields = {
    email:'',
    password:'',
    
}

const SignInForm= ()=>{

  const [formFields,setFormFields] = useState(defaultFormFields);
  const {email,password} = formFields;


const handleChange = (event)=>{
const {name,value} = event.target;
setFormFields({...formFields,[name]:value});
}

const resetFormField = () =>{
    setFormFields(defaultFormFields);
}

const handleSubmit = (event)=>{
    event.preventDefault();
   
    try{
       const {user} = signInAuthUserWithEmailAndPassword(email,password);
     
        resetFormField();

    }catch(error){
        switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password');
                break;
            case 'auth/user-not-found':
                alert('no user found') ;
                break;
            default:
                console.log(error);
        }       
    }       
}

const signInWithGoogle = async ()=>{
    await signInWithGooglePopup();
        }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
               
                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>
                 <div className= 'buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE.google} onClick={signInWithGoogle} >Google Sign In</Button>
                  </div>              
                
            </form>
           
        </div>
    )
};

export default SignInForm;