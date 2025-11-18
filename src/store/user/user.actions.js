import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPE } from "./user.types"

export const setCurrentUser = (user) => 
        createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user)
// export const USER_ACTION_TYPE = {
//     "SET_CURRENT_USER" : 'user/SET_CURRENT_USER',
//     "CHECK_USER_SESSION" : 'user/CHECK_USER_SESSION',
//     "GOOGLE_SIGN_IN_START" : 'user/GOOGLE_SIGN_IN_START',
//     "EMAIL_SIGN_IN_START" : 'user/EMAIL_SIGN_IN_START',
//     "SIGN_IN_SUCESS" : 'user/SIGN_IN_SUCESS',
//     "SIGN_IN_FAILURE" : 'user/SIGN_IN_FAILURE',
// }

export const checkUserSession = () => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

export const googleSignInStart= () => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);
export const emailSignInStart= (email, password) => createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPE.SIGN_IN_SUCESS, {...user});
export const signInFail = (error) => createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, {error});

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPE.SIGN_UP_START, {email, password, displayName});
export const signUpSuccess = ( user, additionalDetail) => createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, {user, additionalDetail});
export const signUpFailed = (error) => createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) => createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, {error});