import React from 'react';
import {connect} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import mytheme from '../theme';
import Container from '@material-ui/core/Container';
import {reduxForm, Field} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditProfileForm from '../components/EditProfileForm';
import { Typography } from '@material-ui/core';

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

function EditProfile(props){
    window.scrollTo(0,0);
    const classes = useStyles();
    console.log(props);
    return(
        <ThemeProvider theme={mytheme}>
            <Navbar />
            <div className="profile-back">
                <Container maxWidth="md" className={classes.editContainer}>
                    <Typography variant='h4' component='h4'>
                        Fill the details you want to edit:
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Be Careful: Filling extra details may cause unwanted changes in your profile!
                    </Typography>
                    <EditProfileForm />
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default EditProfile;