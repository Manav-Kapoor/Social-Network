import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Unknown1 from '../images/1.png';
import mytheme from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  avatarImg: {
    margin: '.5rem auto',
    width: mytheme.spacing(7),
    height: mytheme.spacing(7),
    borderRadius: '50%'
  },
  menu: {
      zIndex: '10',
      width: 120
  },
  links: {
      color: 'black'
  }
}));

function Dropdown(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    const token = props.user.token;
    props.logout(token);
  }

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {props.user.user.avatar ? <img className={classes.avatarImg} src={`data:image/jpg;base64,${props.user.user.avatar}`}/> : <img className={classes.avatarImg} src={Unknown1}/>}
        </Button>
        <Popper className={classes.menu} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps}) => (
            <Grow
              {...TransitionProps}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Link to='/' className={classes.links}><MenuItem onClick={handleClose}>Home</MenuItem></Link>
                    <Link to='/profile' className={classes.links}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                    <Link to='/edit' className={classes.links}><MenuItem onClick={handleClose}>Edit Profile</MenuItem></Link>
                    <Link to="#" onClick={handleLogout} className={classes.links}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
  return{
    logout: (token) => {dispatch(logout(token))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);