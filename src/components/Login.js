import React from 'react';
import {clearAuthentication, login, startLogin} from '../actions/auth';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';



class Login extends React.Component{

    constructor(props){
        super(props);

        // this.emailInputRef = React.createRef();
        // this.passInputRef = React.createRef();

        this.state={
            email:'',
            password:''
        }
    }

    componentWillUnmount(){
        this.props.dispatch(clearAuthentication());
    }

    // handleFormSubmit = (e) =>{
    //     e.preventDefault();
    //     console.log(this.passInputRef);
    //     console.log(this.emailInputRef);
    // }

    handleEmail = (e) =>{
        this.setState({
            email:e.target.value
        })
    }

    handlePass = (e) =>{
        this.setState({
           password:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(this.state);

        const {email, password} = this.state;

        if(email && password){
            this.props.dispatch(startLogin());
            this.props.dispatch(login(email,password));
        }
    }
    
    render(){

        const {error,isLoggedin,inProgress} =  this.props.auth;
    
        
        if(isLoggedin){
            return <Navigate to='./'></Navigate>
        }

        return(
        <form className="login-form">
            <span className="login-signup-header">Log In</span>
            {error && <div className="alert error-dailog">{error}</div>}
            <div className="field">
                <input type="email" 
                placeholder="Email"
                required
                // ref={this.emailInputRef}
                onChange={this.handleEmail}
                value={this.state.email}
                />
            </div>
            <div className="field">
                <input type="password"
                placeholder="Password"
                required 
                //  ref={this.passInputRef}
                onChange={this.handlePass}
                value={this.state.password}
                />
            </div>
            <div className="field">
            {
                inProgress ?(
                <button onClick={this.handleSubmit} disabled={inProgress}>Logging In...</button>)
                 :
                (<button onClick={this.handleSubmit} disabled={inProgress}>Log In</button>)
            }


           
            </div>
      </form>
        )
    }
}

function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  export default  connect(mapStateToProps)(Login);

