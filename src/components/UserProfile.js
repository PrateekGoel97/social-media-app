import React, { Component } from 'react';
import { Navigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend} from '../actions/friends';


const UserProfileWrapper = (props) =>{

  const {userId} = useParams();
  
  return (
      <UserProfile userId={userId} props={props}/>
  );
}

class UserProfile extends Component {

  constructor(props){
    super(props);

    this.state={
      success:null,
      error:null,
      successMessage:null
    }
  }
  

  componentDidMount(){

    console.log('profile',this.props.userId);

    console.log('params',this.props.params);

    this.props.props.dispatch(fetchUserProfile(this.props.userId));
    
  }

  componentDidUpdate(prevProps) {

    // console.log(prevProps);

    // console.log('current',this.props);

    if(prevProps.userId !== this.props.userId){
      this.props.props.dispatch(fetchUserProfile(this.props.userId));
    }

  }



  checkIfUserIsAFriend(){

    const {friends} = this.props.props;
    const userId = this.props.userId;

    const index= friends.map(friend => friend.to_user._id).indexOf(userId);

    if(index === -1){
      return false;
    }
    else
      return true;
  }

  handleAddFriend = async () =>{

    const userId = this.props.userId;
    const url = APIUrls.addFriend(userId);

    const options= {
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    }

    const res = await fetch(url,options);
    const data = await  res.json();

    console.log(data);

      if(data.success){
        this.setState({
          success:true,
          successMessage:"Friend Added Successfully!"
        })
        this.props.props.dispatch(addFriend(data.data.friendship));
      }else{
        this.setState({
          success:null,
          error:data.message
        })
      }

  }

  removeFriend = async () =>{

    const userId = this.props.userId;
    const url = APIUrls.removeFriend(userId);

    const options= {
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    }

    const res = await fetch(url,options);
    const data = await  res.json();

    console.log(data);

      if(data.success){
        this.setState({
          success:true,
          successMessage:"Friend Removed Successfully!!"
        })
        this.props.props.dispatch(removeFriend(this.props.userId));
      }else{
        this.setState({
          success:null,
          error:data.message
        })
        
      }

  }


  render() {
    
   const {user,inProgress} = this.props.props.profile;
   const isUserFriend = this.checkIfUserIsAFriend();
   const {error,success,successMessage} = this.state;

   console.log('inside render inprogress',inProgress);

    if(this.props.userId === this.props.props.auth.user._id ){
      return <Navigate to='/Settings' />
    }
    else

     if(inProgress){
       return <h2>Loading...</h2>
     }
     else

    return (
      <div className="settings">
      
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user-dp"
          />
        </div>

        

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {
            isUserFriend?(<button className="button save-btn" onClick={this.removeFriend}>Remove Friend</button>):
                        (<button className="button save-btn" onClick={this.handleAddFriend}>Add Friend</button>)
          }

          {success && <div className="alert success-dailog" >{successMessage}</div>}
          {error && <div className="alert error-dailog">{error}</div>}
          
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    profile:state.profile,
    friends:state.friends,
    auth:state.auth
  };
}

export default connect(mapStateToProps)(UserProfileWrapper);



