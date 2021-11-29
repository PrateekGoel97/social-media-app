import { FETCH_USER_PROFILE, USER_PROFILE_FAILED, USER_PROFILE_SUCCESS } from "../actions/actionTypes";

const intialProfileState={
    user:{},
    inProgress:true,
    error:null,
    success:null
}

export default function profile (state=intialProfileState,action){
    // return state;
    // { posts:[]}

    switch(action.type){
        case USER_PROFILE_SUCCESS: 
        return {
            ...state,
            success:true,
            user:action.user,
            inProgress:false
        }

        case USER_PROFILE_FAILED:
            return{
                ...state,
                error:action.error,
                inProgress:false
            }

            case FETCH_USER_PROFILE:
                return{
                    ...state,
                    inProgress:true
                }

        default: return state;
    }
}
