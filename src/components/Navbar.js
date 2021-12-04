import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { logoutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';


class Navbar extends React.Component{

  handleLogout = () =>{

    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  }
  
  handleSearch = (e) =>{
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  }



  render(){

    const {auth,results} = this.props;

    return (

      <nav className="nav">
          <div className="left-div">
            <Link to='/'>
              <img
                src= "https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" 
                alt="logo"
              />
            </Link>
          </div>

      
          <div className="search-container">
           { auth.isLoggedin &&( <><img
              className="search-icon"
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="search-icon"
            />
            <input placeholder="Search" onChange={this.handleSearch}/> </>)}

            {results.length > 0 && (

            <div className="search-results">
              <ul>

                {results.map ( (user) =>(

                  <li className="search-results-row" key={user._id}>
                  <Link to={`user/${user._id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="user-dp"
                      />
                      <span>
                        {user.name}
                      </span>
                  </Link>
                </li>

                ))}
                
              </ul>
            </div>
           )}
          
          </div>
          <div className="right-nav">
            { auth.isLoggedin && (<div className="user">
              <Link to='/Settings'>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user-dp"
                id="user-dp"
              />
              </Link>
              <span>{auth.user.name}</span>
             
            </div>)}
            
            <div className="nav-links">
              <ul>

                {!auth.isLoggedin && (<li>
                <Link to='/Login' >
                  Log in
                  </Link>
                </li>)}

              {auth.isLoggedin && (
                <li onClick={this.handleLogout}>
                  Log Out
                </li>)}
                
                {
                  !auth.isLoggedin && (<li>
                    <Link to='/Signup' >
                      Register
                      </Link>
                    </li>)
                }
                
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

function mapStateToProps(state){
  return  {
    auth:state.auth,
    results:state.search.results
  }
}

export default connect(mapStateToProps)(Navbar);
