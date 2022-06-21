
import {useState} from 'react';
import {createUserDocumentFromAuth, createAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component.jsx';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm= ()=>{

  const [formFields,setFormFields] = useState(defaultFormFields);
  const {displayName,email,password,confirmPassword} = formFields;
  console.log(formFields);

const handleChange = (event)=>{
const {name,value} = event.target;
setFormFields({...formFields,[name]:value});
}

const resetFormField = () =>{
    setFormFields(defaultFormFields);
}

const handleSubmit = (event)=>{
    event.preventDefault();
   
    if(password !== confirmPassword){
        alert("Password does not match");
        return;
    }
    try{
        const {user}  =  createAuthUserWithEmailAndPassword(email,password);
         createUserDocumentFromAuth(user,{displayName});
        resetFormField();

    }catch(error){
        if(error.code==='auth/email-already-in-use'){
            alert('Cannot create user,email already in use');
        }
console.log("user creation encountered an error");
    }
       
}

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>
                
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;