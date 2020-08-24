import React from 'react';
import {connect} from 'react-redux';
import LoginScreen from './loginScreen';
import HomePage from './HomePage';

class Home extends React.Component{
    render(){
        if(this.props.user.isLoggedIn){
            return(
                <HomePage />      
            );
        }else{
            return(
                <LoginScreen />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Home);