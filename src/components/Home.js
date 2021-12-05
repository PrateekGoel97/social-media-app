import React from 'react';
import {PostsList,FriendsList, Welcome} from './';


class Home extends React.Component{

    render(){
            const {posts,isLoggedin,friends} = this.props;
            

            if(!isLoggedin){
                return <Welcome />
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