import React from 'react';


class Signup extends React.Component{

 render(){

   return(
   <form className="login-form">
       <span className="login-signup-header">Sign Up</span>
       <div className="field">
           <input type="name" 
           placeholder="Name"
           required
           />
       </div>
       <div className="field">
           <input type="email"
           placeholder="Email"
           required 
           />
       </div>
       <div className="field">
           <input type="password"
           placeholder="Password"
           required 
           />
       </div>
       <div className="field">
           <input type="password"
           placeholder="Confirm Password"
           required 
           />
       </div>
       <div className="field">
       <button >Register</button>
       </div>
 </form>
   )
 }
}



export default Signup;