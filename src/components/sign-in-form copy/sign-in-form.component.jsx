import { useState } from "react"
import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {
    SignUpContainer,
    ButtonContainer,
} from './sign-in.styles'
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.actions";
const defaultFormField = {
    email : '',
    password : '',
} 


const SignInForm = ({ logGoogleUser }) => {
    const [formField, setFormField] = useState(defaultFormField);
    const {  email, password } = formField;
    const dispatch = useDispatch();

    const resetFormField = () => {
    setFormField(defaultFormField)
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormField({...formField, [name]:value})
    };

    const signInWithGoogle = () => {
        dispatch(googleSignInStart());
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (error) {
            console.log("User Sign in Failed: ", error);
        }
    }
    

    return (
        <SignUpContainer>
            <h2>I already have an account</h2>
            <h3>Sign in with your email and password</h3>
            <form onSubmit={handleSubmit}>
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
                <ButtonContainer>
                    <Button type='submit'>Sign in</Button>
                    <Button
                        type = 'button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign in
                    </Button>
                </ButtonContainer>
            </form>
        </SignUpContainer>
    )
}
export default SignInForm