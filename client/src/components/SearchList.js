import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {follow, unFollow} from '../actions';
import {Link} from 'react-router-dom';
import errorImg from '../images/error.png';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '36ch',
    minWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center'
  },
  inline: {
    display: 'inline',
  },
  btns: {
    marginLeft: 'auto'
  },
  name: {
    color: 'black'
  },
}));

function SearchList(props) {
  const classes = useStyles();

  const handleFollow = (userId) => {
    props.follow(props.user.token, userId);
  }
  const handleUnFollow = (userId) => {
    props.unFollow(props.user.token, userId);
  }
  const renderButtons = (user) => {
    if(props.user.user._id !== user._id){
      if(props.user.user.following.some(follows => follows.followingId === user._id)){
        return <Button variant="contained" color="primary" onClick={()=>handleUnFollow(user._id)} className={classes.btns}>Unfollow</Button>
      }else{
        return <Button variant="contained" color="primary" onClick={()=>handleFollow(user._id)} className={classes.btns}>Follow</Button>
      }
    }
  }
  const renderList = () => {
      return props.data.map((user, key)=>{
        const visit = "/visit/" + user._id;
          return(
              <ListItem key={key}>
                <ListItemAvatar>
                {user.avatar ? <Avatar alt={user.name} src={`data:image/jpg;base64,${user.avatar}`} /> : <Avatar src={user.name} />}
                </ListItemAvatar>
                <Link to={visit}>
                  <ListItemText
                    primary={user.name}
                    className={classes.name}
                  />
                </Link>
                {renderButtons(user)}
              </ListItem>
          );
      })
  }
  return (
    <List className={classes.root}>
      {props.data.length > 0 ? renderList() : 
        <img src={errorImg} className={classes.img} />
      }
    </List>
  );
}

const mapStateToProps = state => {
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchList);