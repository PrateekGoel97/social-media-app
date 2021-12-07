import { Link } from "react-router-dom";
import img from '../images/social1.svg';


function Welcome (props){

    return (
        <div className="welcome">

            <div className="welcome-header">
                <span >Welcome to Codeial</span>
            </div>

            <div className="welcome-image">
                <img src={img} alt="Welcome-img"></img>
            </div>

            <div className="welcome-button">

                <Link to='/login'>
                <button>Login</button>
                </Link>

                <Link to='/Signup'>
                <button>Register</button>
                </Link>
            </div>

      </div>)
}

export default Welcome;