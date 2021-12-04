import { FETCH_SEARCH_SUCCESS } from "../actions/actionTypes";

const intialSearchResult = {
    results:[]
}




export default function search(state=intialSearchResult,action){

    switch(action.type){
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                results:action.users
            }


        default:return state;
    }
}