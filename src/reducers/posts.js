import { UPDATE_POSTS, ADD_POST, ADD_COMMENT, UPDATE_POST_LIKE, DELETE_COMMENT } from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];

    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;

    case DELETE_COMMENT:
        const DelPosts = state.map((post) =>{
          if(post._id === action.postId){
            return {
              ...post,
              comments: post.comments.filter((comment) => comment._id !== action.commentId)
            }
          }

          return post;
        })

        return DelPosts;

    case UPDATE_POST_LIKE:
        const updatedPosts = state.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                likes:[...post.likes,action.userId]
              };
            }
    
            return post;
          });
          return updatedPosts;

    default:
      return state;
  }
}
