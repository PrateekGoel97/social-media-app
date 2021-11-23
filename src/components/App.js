import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Link, Route , Routes , Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import  jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Navbar , Home,  Page404, Login , Signup, Settings} from './';
import { authenticateUser } from '../actions/auth';



const PrivateRoute = (PrivateRouteProps) =>{

  const {isLoggedin,component : Component} = PrivateRouteProps;

    if(isLoggedin){
      return <Component />
    }
    else
      return <Navigate to = '/Login' />
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');

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
    }
  }

  render() {
    const { posts, auth} = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          
          <Routes>
          <Route  path='/' element={<Home posts={posts} />} />
          <Route path='/Login' element ={<Login />} />
          <Route path='/Signup' element ={<Signup />} />
          <Route path='/Settings'  element={<PrivateRoute component={Settings} isLoggedin={auth.isLoggedin}/>}  />
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
    auth:state.auth
  };
}
const AppComponent = connect(mapStateToProps)(App)
export default AppComponent;
