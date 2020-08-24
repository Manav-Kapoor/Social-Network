import React from 'react';
import Container from '@material-ui/core/Container';
import NavBar from '../components/Navbar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles} from '@material-ui/core/styles';
import './style.css';
import ProfileCard from '../components/ProfileCard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import mytheme from '../theme';
import { ThemeProvider } from '@material-ui/styles';
import PostCard from '../components/PostCard';
import {connect} from 'react-redux';
import {createPost} from '../actions';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        flexGrow: 3,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
        width: '40%'
    },
    profilePaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        marginTop: theme.spacing(2),
        width: '95%'
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
    }
}));

function HomePage(props){
    console.log(props);
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
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
    // const handleSearchChange = (e) => {
    //     if(searchValue.trim() !== ''){
    //         window.location.href = '/'
    //     }
    // }
    const renderPosts = () =>{
        return props.user.posts.map((post, key)=>{
            return <PostCard data={post} key={key}/>
        })
    }
    if(props.user.isLoggedIn){
        return(
            <ThemeProvider theme={mytheme}>
                <NavBar />
                <Container maxWidth="lg">
                    <div className="search-div">
                        <TextField className={classes.title} value={searchValue} onChange={handleSearchChange} id="outlined-basic" label="Search" variant="outlined"/>
                        <Link to={{pathname: `/search/${searchValue}`}}><Button variant="contained" className={classes.publish} color="primary">Search</Button></Link>
                    </div>
                    <div className="post-page">
                        <Hidden smDown>
                            <ProfileCard/>
                        </Hidden>
                        <div className={classes.paper}>
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
                                <Button variant="contained" className={classes.clear} onClick={()=>setValue('')}>Clear</Button>
                            </div>
                            {renderPosts()}
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        )
    }
    else{
        return <div>Please Login</div>
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        createPost: (post, token) => {dispatch(createPost(post, token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);