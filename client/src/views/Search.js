import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import mytheme from '../theme';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import SearchList from '../components/SearchList';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: mytheme.palette.primary.main,
      marginRight: '1rem',
      width: mytheme.spacing(10),
      height: mytheme.spacing(10)
    },
    avatarImg: {
        marginTop: '2rem',
        width: mytheme.spacing(30),
        height:mytheme.spacing(30)
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
    editForm: {
        paddingTop: '2rem',
        width: '50%',
        marginRight: '0'
    },
    editContainer: {
        backgroundColor: 'white',
        padding: '2rem'
    }
}));

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            arr: [],
            loading: true
        }
    }
    async componentDidMount(){
        if(this.props.user.isLoggedIn){
            const response = await Axios.get('https://inkit.herokuapp.com/users/all', {
                headers: {
                    authorization: `Bearer ${this.props.user.token}`
                }
            })
            if(response.status === 200){
                const nameArr = response.data.filter((user)=> user.name.toLowerCase() === this.props.match.params.name);
                this.setState({
                    arr: nameArr,
                    loading: false
                })
            }
        }
    }
    render(){
        window.scrollTo(0,0);
        if(this.props.user.isLoggedIn){
            if(this.state.loading){
                return(
                    <ThemeProvider theme={mytheme}>
                        <Navbar />
                        <div className="profile-back">
                            <Container maxWidth="md" >
                                <CircularProgress color="secondary" />               
                            </Container>
                        </div>
                    </ThemeProvider>
                )
            }
            else{
                return(
                    <ThemeProvider theme={mytheme}>
                        <Navbar />
                        <div className="profile-back">
                            <Container maxWidth="md" >
                                <Paper elevation={1} className="search-paper">
                                    <SearchList data={this.state.arr}/>
                                </Paper>
                            </Container>
                        </div>
                    </ThemeProvider>
                )
            }
        }else{
            return(
                <ThemeProvider theme={mytheme}>
                    <div>
                        <Container maxWidth="md" >
                            Please Login
                        </Container>
                    </div>
                </ThemeProvider>
            )
        }
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Search);