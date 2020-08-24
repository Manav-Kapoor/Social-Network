import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import mytheme from '../theme';
import {connect} from 'react-redux';
import Unknown1 from '../images/1.png';
import {Link} from 'react-router-dom';
import {logout, logoutAll} from '../actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 500,
    position: 'sticky',
    top: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  outer: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  follow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  links: {
    backgroundColor: mytheme.palette.common.white,
    width: '100%',
    margin: '0.5rem 0',
    boxShadow: 'none',
    justifyContent: 'flex-start'
  },
  icons: {
    marginRight: '0.5rem'
  },
  avatarImg: {
    margin: '.5rem auto',
    width: mytheme.spacing(20),
    height: mytheme.spacing(20),
    borderRadius: '50%'
  }
});

function ProfileCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const handleLogout = () => {
      const token = props.user.token;
      props.logout(token);
    }
    const handleLogoutAll = () => {
      const token = props.user.token;
      props.logoutAll(token);
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.outer}>
                  {props.user.user.avatar ? <img className={classes.avatarImg} src={`data:image/jpg;base64,${props.user.user.avatar}`}/> : <img className={classes.avatarImg} id="profilePic" src={Unknown1}/>}
                </div>
                <div className={classes.follow}>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Followers: {props.user.user.followers.length}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Following: {props.user.user.following.length}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" component="h2">
                    <Link to='/'><Button variant="contained" className={classes.links}><HomeWorkIcon className={classes.icons}/>Feed</Button></Link>
                  </Typography>
                  <Typography variant="h6" component="h2">
                    <Link to='/profile'><Button variant="contained" className={classes.links}><AccountCircleIcon className={classes.icons}/>Profile</Button></Link>
                  </Typography>
                  <Typography variant="h6" component="h2">
                    <Button variant="contained" className={classes.links}><PeopleIcon className={classes.icons}/>My Followers</Button>
                  </Typography>
                  <Typography variant="h6" component="h2">
                    <Button variant="contained" onClick={handleLogout} className={classes.links}><ExitToAppIcon className={classes.icons}/>Logout</Button>
                  </Typography>
                  <Typography variant="h6" component="h2">
                    <Button variant="contained" onClick={handleLogoutAll} className={classes.links}><ExitToAppIcon className={classes.icons}/>Logout from all sessions</Button>
                  </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    logout: (token) => {dispatch(logout(token))},
    logoutAll: (token) => {dispatch(logoutAll(token))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);