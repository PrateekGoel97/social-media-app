import { APIUrls } from "../helpers/urls"
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_SEARCH_SUCCESS } from "./actionTypes"


export function searchUsers(searchText){

    return (dispatch) =>{

        const url = APIUrls.searchUsers(searchText);

        fetch(url,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            }
        })
        .then(res => res.json())
        .then(data => {

          //  console.log('search data',data);

            if(data.success){
                dispatch(searchResultSuccess(data.data.users));
            }
            else
                dispatch(searchResultSuccess([]));
        })
    }

}

export function searchResultSuccess(users){
        return {
            type:FETCH_SEARCH_SUCCESS,
            users
        }
}

