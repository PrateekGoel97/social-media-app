import { APIUrls } from '../helpers/urls';
import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts(){


    return (dispatch) =>{

        const url = APIUrls.fetchPosts();
        
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            // console.log(data.data.posts);

            dispatch(updatePosts(data.data.posts));
             
        })
        .catch(err => console.log(err)) ;
    }
}

export function updatePosts(posts){
    return {
        type:UPDATE_POSTS,
        posts
    }
}