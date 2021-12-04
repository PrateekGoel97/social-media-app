import React from 'react';
import {PostsList,FriendsList} from './';


class Home extends React.Component{

    render(){
            const {posts,isLoggedin,friends} = this.props;
            

            if(!isLoggedin){
                return <h1>Welcome to Codeial</h1>
            }

        return(
            <div className='home'>
                <PostsList posts={posts} />
                {isLoggedin && <FriendsList friends={friends} />}
            </div>
        )
    }
}


export default Home;