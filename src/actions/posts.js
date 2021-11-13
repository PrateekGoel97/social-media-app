import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts(){


    return (dispatch) =>{

        const url = 'http://13.233.236.31/api/v1/posts';
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            //  console.log(data);

             dispatch(updatePosts(data.posts));
             
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