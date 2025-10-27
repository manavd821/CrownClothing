// import {
//     createUserDocumentFromAuth,
//     auth,
// } from '../../utils/firebase/firebase.utils'
// import { getRedirectResult } from 'firebase/auth'
// import { useEffect } from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form copy/sign-in-form.component'
import './authentication.styles.scss'

const defaultFormField = {
    email : '',
    password : '',
} 

const Authentication = () => {

    // useEffect( () =>{
    //     const fetchRedirectResult = async () => {
    //         try {
    //             const result = await getRedirectResult(auth)
    //             if (result) {
    //                 const { user } = result
    //                 const userDocRef = await createUserDocumentFromAuth(user);
    //             }
    //             // else console.log("No redirect result yet")
    //         } catch (e) {
    //             console.error("Error in sign in user:", e)
    //         }
    //     }

    //     fetchRedirectResult()
    // }, [])

    return (
            <div className="authentication-container">
                <SignInForm/>
                <SignUpForm/>
            </div>
        )
    }
export default Authentication