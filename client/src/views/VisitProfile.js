import React from 'react';
import {connect} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import mytheme from '../theme';
import Container from '@material-ui/core/Container';
import Unknown1 from '../images/1.png';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ModalComponent from '../components/Modal';
import SettingsIcon from '@material-ui/icons/Settings';
import PostCard from '../components/PostCard';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import {follow, unFollow} from '../actions';
import camera from '../images/camera.png';
import Axios from 'axios';
import Profile from './Profile';

class VisitProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            posts: [],
            isLoading: true
        }
    }
    async componentDidMount(){
        if(this.props.user.isLoggedIn && this.props.match.params.id){
            const response = await Axios.get(`https://inkit.herokuapp.com/users/${this.props.match.params.id}`, {
                headers: {
                    authorization: `Bearer ${this.props.user.token}`
                }
            });
            if(response.status === 200){
                const responsePosts = await Axios.get(`https://inkit.herokuapp.com/posts/${response.data._id}`, {
                    headers: {
                        authorization: `Bearer ${this.props.user.token}`
                    }
                });
                if(this.props.user.user.following.filter(user => user.followingId.toString() === response.data._id.toString()).length){
                    console.log(this.props.user.user.following.filter(user => user.followingId.toString() === response.data._id.toString()));
                    this.setState({
                        ...this.state,
                        user: response.data,
                        isLoading: false,
                        posts: responsePosts.data,
                        isFollowed: true
                    })
                }else{
                    this.setState({
                        ...this.state,
                        user: response.data,
                        isLoading: false,
                        posts: responsePosts.data,
                        isFollowed: false
                    })
                }
            }
        }
    }
    renderPosts = () => {
        return this.state.posts.map((post, key) => {
            return <PostCard data={post} key={key}/>
        })
    }
    handleFollow = (userId) => {
        this.props.follow(this.props.user.token, userId);
        this.setState({
            ...this.state,
            isFollowed: true
        })
    }
    handleUnFollow = (userId) => {
        this.props.unFollow(this.props.user.token, userId);
        this.setState({
            ...this.state,
            isFollowed: false
        })
    }
    render(){
        console.log(this.state);
        console.log(this.props);
        if(this.props.user.isLoggedIn){
            if(this.props.match.params.id == this.props.user.user._id){
                return <Profile />
            }else{
                if(this.state.isLoading){
                    return <>loading</>
                }else{
                    return(
                        <ThemeProvider theme={mytheme}>
                            <Navbar />
                            <div className="profile-back">
                                <Container maxWidth="lg" className="profile-container">
                                    {this.state.user.avatar ? <img className="avatarImg" src={`data:image/jpg;base64,${this.state.user.avatar}`}/> : <img className="avatarImg" id="profilePic" src={Unknown1}/>}
                                    <br />
                                    <Typography variant="h4" component="h2">
                                        {this.state.user.name}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.user.email}
                                    </Typography>
                                    <div className="follow-div-profile">
                                        <Typography color="textSecondary" gutterBottom>
                                            <ModalComponent title="Followers" count={this.state.user.followers.length} data={this.state.user.followers}/>
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            <ModalComponent title="Following" count={this.state.user.following.length} data={this.state.user.following}/>
                                        </Typography>
                                        {this.state.isFollowed ? 
                                            <Button variant="contained" color="primary" onClick={()=>this.handleUnFollow(this.state.user._id)}>Unfollow</Button> :
                                            <Button variant="contained" color="primary" onClick={()=>this.handleFollow(this.state.user._id)}>Follow</Button>
                                        }
                                    </div>
                                    <Container maxWidth="md">
                                        {this.state.isFollowed ? 
                                            <>
                                            <Typography variant="h5" component="h5" className="post-head">
                                                Posts:
                                            </Typography>
                                            {this.renderPosts()}</> : 
                                        <></>}
                                    </Container>
                                </Container>
                            </div>
                        </ThemeProvider>
                    )
                }
            }
        }else{
            return(
                <></>
            )
        }
    }
}


const mapStateToProps = state =>{
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return{
        follow: (token, userId) => {dispatch(follow(token, userId))},
        unFollow: (token, userId) => {dispatch(unFollow(token, userId))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisitProfile);