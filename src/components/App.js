import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router,  Route , Routes , Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import  jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Navbar , Home,  Page404, Login , Signup, Settings,UserProfile} from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';



const PrivateRoute = (PrivateRouteProps) =>{

  const {isLoggedin,component : Component} = PrivateRouteProps;

    if(isLoggedin){
      return <Component />
    }
    else
      return <Navigate to ='/Login'/>
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

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

  render() {
    const { posts, auth, friends} = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          
          <Routes>
          <Route  path='/' element={<Home posts={posts} friends={friends} isLoggedin={auth.isLoggedin}/>} />
          <Route path='/Login' element ={<Login />} />
          <Route path='/Signup' element ={<Signup />} />
          <Route path='/Settings'  element={<PrivateRoute component={Settings} isLoggedin={auth.isLoggedin}/>}  />
          <Route path='/User'>
                <Route path=':userId' element={<PrivateRoute component={UserProfile} isLoggedin={auth.isLoggedin}/>} />
          </Route>
          <Route path='/*' element={<Page404 />} />

          </Routes>
        
        </div>
      </Router>
    );
  }
}

App.propTypes ={
  posts : PropTypes.array.isRequired
}


function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth:state.auth,
    friends:state.friends
  };
}
const AppComponent = connect(mapStateToProps)(App)
export default AppComponent;

