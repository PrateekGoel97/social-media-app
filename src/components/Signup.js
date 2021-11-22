import React from 'react';
import {connect} from 'react-redux';
import {signup, signupStart} from '../actions/auth';

class Signup extends React.Component{


   constructor(props){
      super(props);

      this.state = {
         name:'',
         email:'',
         password:'',
         confirmPassword:''
      }
   }

handleName = (e) =>{

   this.setState({
      name:e.target.value
   })

}

handleEmail = (e) => {
   
   this.setState({
      email:e.target.value
   })
}


handlePassword = (e) =>{

   this.setState({
      password:e.target.value
   })
}

handleConfirmPassword = (e) =>{

   this.setState({
      confirmPassword:e.target.value
   })
}

 handleSubmit = (e) =>{

   e.preventDefault();

   //console.log(this.state);

   const {name,email,password,confirmPassword} = this.state;

   if(name && email && password && confirmPassword){
         this.props.dispatch(signupStart());
         this.props.dispatch(signup(name,email,password,confirmPassword));
   }
 }


 render(){

   const {error,inProgress,isLoggedin} = this.props.auth;

   return(
   <form className="login-form">
       <span className="login-signup-header">Sign Up</span>
       {error && <div className="alert error-dailog">{error}</div>}
       <div className="field">
           <input type="name" 
           placeholder="Name"
           onChange={this.handleName}
           value={this.state.name}
           required
           />
       </div>
       <div className="field">
           <input type="email"
           placeholder="Email"
           onChange={this.handleEmail}
           value={this.state.email}
           required 
           />
       </div>
       <div className="field">
           <input type="password"
           placeholder="Password"
           onChange={this.handlePassword}
           value={this.state.password}
           required 
           />
       </div>
       <div className="field">
           <input type="password"
           placeholder="Confirm Password"
           onChange={this.handleConfirmPassword}
           value={this.state.confirmPassword}
           required 
           />
       </div>
       <div className="field">

      {
         inProgress?
         <button  onClick={this.handleSubmit} disabled={inProgress}>Registering....</button>:
         <button  onClick={this.handleSubmit} disabled={inProgress}>Register</button>
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

export default connect(mapStateToProps)(Signup);