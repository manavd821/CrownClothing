import { 
    takeLatest,
    all,
    call,
    put,
} from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import { 
    signUpSuccess,
    signInSuccess,
    signInFail,
    signOutFailed,
    signUpFailed,
    signOutSuccess,
} from './user.actions';
import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    signOutAuthUser,
    createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

export function* getSnapShotFromUserAuth(userAuth, additionalDetails){
    try {
        const userSnapShot = yield call(
            createUserDocumentFromAuth,
            userAuth, 
            additionalDetails,
        );
        yield put(signInSuccess({ id : userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithGoogle(){
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);

    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithEmail(action){
    const { payload } = action;
    const {email, password} = payload;
    try{
        const {user} = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password,
        );
        yield call(getSnapShotFromUserAuth, user);
    }catch(error){
        if(error.code == 'auth/invalid-credential'){
                alert("invalid-credential")
        }
        yield put(signInFail(error));
    }
}

export function* signOutUser(){
    try {
        yield call(signOutAuthUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({ payload : {user, additionalDetails} }){
    yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* withSignUpStart({ payload }){
    const {email, password, displayName} = payload;
    try {
        const user= yield call(createAuthUserWithEmailAndPassword, email, password);
        console.log(user);
        // yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        if(error.code == 'auth/email-already-in-use'){
                    alert("can't create user, email already in use")
                }
        // console.log("Error in creating a user in fireabse: ",error)
        yield put(signUpFailed(error));
    }
}
export function* onCheckUserSession(){
    yield takeLatest(
        USER_ACTION_TYPE.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}
export function* onGoogleSignInAStart(){
    yield takeLatest(
        USER_ACTION_TYPE.GOOGLE_SIGN_IN_START,
        signInWithGoogle,
    )
}
export function* onEmailSignInStart(){
    yield takeLatest(
        USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
        signInWithEmail,
    )
}

export function* onSignOutStart(){
    yield takeLatest(
        USER_ACTION_TYPE.SIGN_OUT_START,
        signOutUser,
    )
}

export function* onSignUpSuccess(){
    yield takeLatest(
        USER_ACTION_TYPE.SIGN_UP_SUCCESS,
        signInAfterSignUp,
    )
}

export function* onSignUpStart(){
    yield takeLatest(
        USER_ACTION_TYPE.SIGN_UP_START,
        withSignUpStart,
    )
}


export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInAStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ])
}