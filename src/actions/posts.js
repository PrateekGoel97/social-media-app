import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {ADD_POST, UPDATE_POSTS, ADD_COMMENT} from './actionTypes';

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


export function addPost(post){
    return {
        type:ADD_POST,
        post
    }
}


export function createPost(content){
    return (dispatch) =>{

        const url = APIUrls.createPost();

        fetch(url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
        },
        body: getFormBody({content})
      })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        if(data.success){
            dispatch(addPost(data.data.post));
        }
      })
    }
}

export function createComment(content, postId) {
    return (dispatch) => {
      const url = APIUrls.createComment();
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
        },
        body: getFormBody({ content, post_id: postId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(addComment(data.data.comment, postId));
          }
        });
    };
  }
  
  export function addComment(comment, postId) {
    return {
      type: ADD_COMMENT,
      comment,
      postId,
    };
  }
  