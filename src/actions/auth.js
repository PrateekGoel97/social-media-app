import { APIUrls } from "../helpers/urls";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS } from "./actionTypes";
import { getFormBody } from "../helpers/utils";


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

        console.log(data);
        
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

            console.log(data);

            if(data.success){
                dispatch(signupSuccess(data.data.user));
                return;
            }

            dispatch(signupFailure(data.message));
        })
    }
}

