import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {ADD_POST, UPDATE_POSTS, ADD_COMMENT,DELETE_COMMENT, UPDATE_POST_LIKE} from './actionTypes';

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
  

  export function addLike(id, likeType, userId){

    return (dispatch) => {

        const url = APIUrls.toggleLike(id,likeType);

        fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log('Like data',data);

            if(data.success){
                dispatch(addLikeToStore(id,userId));
            }
        })

    }
  }

  export function addLikeToStore(postId,userId){
      return {
          type:UPDATE_POST_LIKE,
          postId,
          userId
      }

  }



  
export function destroyComment(postId,commentId) {
  return (dispatch) => {
    const url = APIUrls.destroyComment(commentId);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('delete data',data);

        if (data.success) {
          dispatch(deleteComment(postId,commentId));
        }
      });
  };
}

export function deleteComment(postId,commentId) {
  return {
    type: DELETE_COMMENT,
    commentId,
    postId,
  };
}