import { useState } from "react"
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    SignUpContainer,
} from './sign-up.styles'

const defaultFormField = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
} 


const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    const resetFormField = () => {
    setFormField(defaultFormField)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormField({...formField, [name]:value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (e.target.password.value == e.target.confirmPassword.value){
            try{
                const { user } = await createAuthUserWithEmailAndPassword(e.target.email.value, e.target.password.value)

                await createUserDocumentFromAuth(user, { displayName });
                resetFormField();
            }catch(e){
                if(e.code == 'auth/email-already-in-use'){
                    alert("can't create user, email already in use")
                }
                console.log("Error in creating a user in fireabse: ",e)
            }
        }
        else
            console.log("Password not matched")
    }
    

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label = "Display Name"
                    type="text"
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    required
                />
                <FormInput
                    label = "Email"
                    type="email"
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    required
                />
                <FormInput 
                    label={"Password"}
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    minLength={6}
                    required
                />
                <FormInput
                    label={"Confirm Password"}
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    minLength={6}
                    required
                />
                <Button  type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    )
}
export default SignUpForm