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
import {createPost, addProfilePicture} from '../actions';
import camera from '../images/camera.png';

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: mytheme.palette.primary.main,
      marginRight: '1rem',
      width: mytheme.spacing(10),
      height: mytheme.spacing(10),
      borderRadius: '50%'
    },
    avatarImg: {
        marginTop: '2rem',
        width: mytheme.spacing(30),
        height:mytheme.spacing(30),
        borderRadius: '50%'
    },
    postTitle: {
        textAlign: 'left'
    },
    textbox:{
        width: '100%'
    },
    publish: {
        margin: '.5rem'
    },
    clear: {
        margin: '.5rem'
    },
    buttonDiv : {
        textAlign: 'right'
    },
    camera: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    }
}));

function Profile(props){
    window.scrollTo(0,0);
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit = (event) => {
        var x = document.getElementById("outlined-multiline-static").value;
        if(x.trim() === ''){

        }
        else{
            const post = {
                content: x
            }
            props.createPost(post, props.user.token);
            setValue('');
        }
    }
    const renderMyPosts = () => {
        console.log(props.user.posts);
        const myposts = props.user.posts.filter((post)=> post.owner_id._id == props.user.user._id);
        return myposts.map((post, key) => {
            return <PostCard data={post} key={key}/>
        })
    }

    const onChange = (e) => {
        let file = e.target.files[0];
        const formData = new FormData();
        console.log(formData);
        formData.append('avatar', file);
        props.addProfilePicture(props.user.token, formData);
    }

    if(props.user.isLoggedIn){
        return(
            <ThemeProvider theme={mytheme}>
                <Navbar />
                <div className="profile-back">
                    <Container maxWidth="lg" className="profile-container">
                        {props.user.user.avatar ? <img className={classes.avatarImg} src={`data:image/jpg;base64,${props.user.user.avatar}`}/> : <img className={classes.avatarImg} id="profilePic" src={Unknown1}/>}
                        <br />
                        <label htmlFor="file" className={classes.cameraLabel}><img src={camera} className={classes.camera} /></label>
                        <input type="file" id="file" className="input-file" onChange={(e) => onChange(e)}/>
                        <Typography variant="h4" component="h2">
                            {props.user.user.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.user.user.email}
                        </Typography>
                        <div className="follow-div-profile">
                            <Typography color="textSecondary" gutterBottom>
                                <ModalComponent title="Followers" count={props.user.user.followers.length} data={props.user.user.followers}/>
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                <ModalComponent title="Following" count={props.user.user.following.length} data={props.user.user.following}/>
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                <Link to='/edit'>
                                    <Button variant="contained"><SettingsIcon />Change Password</Button>
                                </Link>
                            </Typography>
                        </div>
                        <Container maxWidth="md">
                            <TextField
                                className={classes.textbox}
                                id="outlined-multiline-static"
                                label="Write Something..."
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={handleChange}
                                value={value}
                            />
                            <div className={classes.buttonDiv}>
                                <Button variant="contained" className={classes.publish} color="primary" onClick={handleSubmit}>Publish</Button>
                                <Button variant="contained" className={classes.clear}>Clear</Button>
                            </div>
                            <Typography variant="h5" component="h5" className={classes.postTitle}>
                                Your Posts:
                            </Typography>
                            {renderMyPosts()}
                        </Container>
                    </Container>
                </div>
            </ThemeProvider>
        )
    }
    else{
        return <div>Please Login</div>
    }
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return{
        createPost: (post, token) => {dispatch(createPost(post, token))},
        addProfilePicture: (token, formData) => {dispatch(addProfilePicture(token, formData))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);