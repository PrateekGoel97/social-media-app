import React from 'react';
import { destroyComment } from '../actions/posts';



function Comment(props) {

  function handleDeleteComment(){

     props.dispatch(destroyComment(postId,comment._id));
  }

 const {comment,postId,auth} = props;
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">

        <div>
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">{comment.createdAt}</span>
        </div>
      
      <div>
          { comment.user._id === auth.user._id
            &&( <span onClick={handleDeleteComment}  className='post-comment-delete'>
              <img src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png" alt="delete-icon" ></img>
              </span>)
          }
        </div>
        
      </div>
      {/* <div>
        <span>X</span>
      </div> */}

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}



export default Comment;
