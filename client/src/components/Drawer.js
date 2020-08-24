import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import mytheme from '../theme';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import {connect} from 'react-redux';
import logoShort from '../images/logo-short.png';
import {Link} from 'react-router-dom';
import Unknown from '../images/1.png';
import {logout, logoutAll} from '../actions';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
  follow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0.75rem'
  },
  outer: {
    width: '100%',
    textAlign: 'center',
    margin: '1.5rem 0'
  },
  avatarImg: {
    margin: '.5rem auto',
    width: mytheme.spacing(10),
    height: mytheme.spacing(10),
    borderRadius: '50%'
  },
});

function LeftDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleLogout = () => {
        const token = props.user.token;
        props.logout(token);
    }
    const handleLogoutAll = () => {
        const token = props.user.token;
        props.logoutAll(token);
    }
    const anchor = 'left';
    return (
        <div>
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                    <img src={logoShort} className="logo"/>
                </Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {/* {list(anchor)} */}
                    <div className={classes.outer}>
                        {props.user.avatar ? <></> : <img className={classes.avatarImg} src={Unknown}/>}
                    </div>
                    <div className={classes.follow}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Followers: 250
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Following: 300
                        </Typography>
                    </div>
                    <div className={classes.list}>
                        <Typography variant="h6" component="h2">
                            <Link to='/'>
                                <Button variant="contained" className={classes.links}><HomeWorkIcon className={classes.icons}/>Feed</Button>
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="h2">
                            <Link to='/profile'>
                                <Button variant="contained" className={classes.links}><AccountCircleIcon className={classes.icons}/>Profile</Button>
                            </Link>
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
                </Drawer>
            </React.Fragment>
        </div>
    );
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return{
      logout: (token) => {dispatch(logout(token))},
      logoutAll: (token) => {dispatch(logoutAll(token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);