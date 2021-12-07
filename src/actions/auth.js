import { APIUrls } from "../helpers/urls";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, EDIT_USER_SUCCESSFUL, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS,EDIT_USER_FAILED } from "./actionTypes";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";


export function startLogin(){
    return {
        type:LOGIN_START,
    }
}

export function loginFailed(error){
    return {
        type:LOGIN_FAILED,
        error
    }
}

export function loginSuccess(user){
        return{
            type:LOGIN_SUCCESS,
            user
        }
}

export function login(email,password){

    return (dispatch) =>{
        
        const url = APIUrls.login();
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({email,password})
        })
        .then(res => res.json())
        .then((data) => {

        //console.log('login data',data);
        
        if(data.success){

            localStorage.setItem('token',data.data.token);
            dispatch(loginSuccess(data.data.user));
            return;
        }

        dispatch(loginFailed(data.message));

        })
         
    }
}

// authentication

export function authenticateUser(user){
    return {
        type:AUTHENTICATE_USER,
        user
    }
}

export function logoutUser(){
    return {
        type:LOGOUT
    }
}

export function clearAuthentication(){
    return {
        type:CLEAR_AUTH_STATE
    }
}

// signup actions


export function signupStart(){

    return {
        type:SIGNUP_START
    }
}


export function signupSuccess(user){
    return {
        type:SIGNUP_SUCCESS,
        user
    }
}


export function signupFailure(error){
    return {
        type:SIGNUP_FAILED,
        error
    }
}

export function signup(name,email,password,confirmPassword){

    return (dispatch) =>{

        const url = APIUrls.signup();

        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({email,password,confirm_password:confirmPassword,name})
        })
        .then(res => res.json())
        .then(data =>{

           // console.log('signup data',data);

            if(data.success){
                localStorage.setItem('token',data.data.token);
                dispatch(signupSuccess(data.data.user));
                return;
            }

            dispatch(signupFailure(data.message));
        })
    }
}

// edit 

export function editUserSuccessful(user){
    return {
        type:EDIT_USER_SUCCESSFUL,
        user
    }
}

export function editUserFailed(error){
    return {
        type:EDIT_USER_FAILED,
        error
    }
}

export function editUser(name,password,confirmPassword,userId){
    return (dispatch) =>{
        const url = APIUrls.editProfile();

        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body: getFormBody({password,confirm_password:confirmPassword,name, id:userId})
        })
        .then(res => res.json())
        .then(data =>{

           // console.log('Editprofilr',data);
            if(data.success){
                dispatch(editUserSuccessful(data.data.user));

                if(data.data.token){
                    localStorage.setItem('token',data.data.token);
                }
                return;
            }

            dispatch(editUserFailed(data.message)); 
        })
    }
}