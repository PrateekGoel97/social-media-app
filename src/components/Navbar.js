import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(props){
    return(
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
              src="https://cdn-icons.flaticon.com/png/512/2811/premium/2811806.png?token=exp=1636805715~hmac=0ac86d84f8b57385fad705ae38a83daf"
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
            <div className="user">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user-dp"
                id="user-dp"
              />
              <span>John Doe</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>
                <Link to='/Login' >
                  Log in
                  </Link>
                </li>
                
                <li>
                <Link to='/Signup' >
                  Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Navbar;