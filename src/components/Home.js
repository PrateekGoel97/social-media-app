import React from 'react';
import {PostsList,FriendsList, Welcome} from './';
import Chat from './Chat';
import { fetchPosts } from '../actions/posts';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';
import  jwtDecode from 'jwt-decode';



class Home extends React.Component{


  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();

    //console.log('token',token);

    if(token){
      const user = jwtDecode(token);

    // console.log('user',user);

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