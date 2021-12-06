import React from 'react';
import {PostsList,FriendsList, Welcome} from './';
import  jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';
import Chat from './Chat';

class Home extends React.Component{

    componentDidMount() {
        this.props.dispatch(fetchPosts());
        // this.props.dispatch(fetchUserFriends());
    
        const token = getAuthTokenFromLocalStorage();
    
        if(token){
          const user = jwtDecode(token);
    
          console.log('user',user);
    
          this.props.dispatch(
              authenticateUser({
              email:user.email,
              _id:user._id,
              name:user.name
            })
          );
          this.props.dispatch(fetchUserFriends());
          
        }
      }

    render(){
            const {posts,isLoggedin,friends} = this.props;
            

            if(!isLoggedin){
                return <Welcome />
            }

        return(
            <div className='home'>
                <PostsList posts={posts} />
                {isLoggedin && <FriendsList friends={friends} />}
                {isLoggedin && <Chat />}
            </div>
        )
    }
}


export default Home;