import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import mytheme from '../theme';
import '../views/style.css';
import Hidden from '@material-ui/core/Hidden';
import logo from '../images/logo.png';
import TemporaryDrawer from './Drawer';
import {connect} from 'react-redux';
import Dropdown from './Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: mytheme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  topbar: {
    backgroundColor: mytheme.palette.grey[900]
  },
  avatarImg: {
    margin: '.5rem auto',
    width: mytheme.spacing(7),
    height: mytheme.spacing(7),
    borderRadius: '50%'
  }
}));

function NavBar(props){
    console.log(mytheme);
    const classes = useStyles();
    // console.log(document.getElementsByClassName(classes.toolbar));
    // if(document.getElementsByClassName(classes.toolbar).length !== 0){
    //   window.addEventListener('resize', function(){
    //     if(window.innerWidth < 960){
    //         var x = document.getElementsByClassName(classes.toolbar)[0];
    //         x.style.padding = '0 2rem';
    //     }else{
    //         x = document.getElementsByClassName(classes.toolbar)[0];
    //         x.style.padding = '0 10rem';
    //     }
    //   })
    // }else{
    //   window.removeEventListener('resize', ()=>{});
    // }
    return (
        <ThemeProvider theme={mytheme}>
            <div className={classes.root}>
                <AppBar position="static" className={classes.topbar}>
                    <Toolbar className="toolbar">
                      <Hidden mdUp>
                        <TemporaryDrawer/>
                      </Hidden>
                      <Hidden smDown>
                        <img src={logo} className="logo-main" alt="..."/>
                      </Hidden>
                      <Typography variant="h6" className={classes.title}>
                          INK IT
                      </Typography>
                      <Dropdown />
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) =>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar);