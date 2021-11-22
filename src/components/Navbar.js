import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { logoutUser } from '../actions/auth';


class Navbar extends React.Component{

  handleLogout = () =>{

    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  }

  render(){

    const {auth} = this.props;

    return (

      <nav className="nav">
          <div className="left-div">
            <Link to='/'>
              <img
                src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://cdn-icons.flaticon.com/png/512/3031/premium/3031293.png"
              alt="search-icon"
            />
            <input placeholder="Search" />

            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            { auth.isLoggedin && (<div className="user">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user-dp"
                id="user-dp"
              />
              <span>auth.user.name</span>
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
    auth:state.auth
  }
}

export default connect(mapStateToProps)(Navbar);
