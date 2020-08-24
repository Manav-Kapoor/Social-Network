import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import mytheme from '../theme';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import {likePost, commentPost} from '../actions';
import {connect} from 'react-redux';
import red from '@material-ui/core/colors/red';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'left',
    margin: '1rem 0'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  commentAvatar: {
      backgroundColor: mytheme.palette.primary.main,
      marginRight: '1rem'
  },
  commentHead: {
      display: 'flex',
      alignItems: 'center'
  },
  commentDescription: {
      marginLeft: '3.5rem',
      marginTop: '.2rem',
  },
  commentDiv: {
      padding: '.75rem',
      backgroundColor: pink[50],
  },
  icons: {
      paddingTop: '0',
      paddingBottom: '0'
  },
  collapse: {
      width: '95%',
      margin: '0 auto',
      paddingTop: '0'
  },
  textfield: {
      marginBottom: '.3rem',
      width: '90%'
  },
  postComment: {
    display: 'flex',
    alignItems: 'center'
  },
  postCommentDiv: {
    height: 40
  },
  likedButton: {
    color: red['A700']
  },
  avatarImg: {
    width: 40,
    height: 40
  },
  owner_name: {
    color: 'black'
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const renderAvatar = (string) =>{
    var arr = string.split(' ');
    var str = arr[0][0];
    if(arr[1]){
        str+=arr[1][0]
    }
    return str;
  }
  const getDate = () =>{
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    var arr = props.data.createdAt.split('T');
    var dateArray = arr[0].split("-").reverse();
    var str = dateArray[0]+" "+months[dateArray[1]-1]+" "+dateArray[2];
    var time = arr[1].split(":");
    time[0] = parseInt(time[0]);
    time[1] = parseInt(time[1]);
    time[0]+=5;
    time[1]+=30;
    if(time[1]>=60){
      time[1]-=60;
      time[0]+=1;
    }
    if(time[0] >= 24){
      time[0]-=24;
    }
    str+=", "+time[0]+":"+time[1];
    return str;
  }
  const renderComments = () =>{
    return props.data.comments.map((comment, key) => {
        return <Paper elevation={0} key={key} className={classes.commentDiv}>
            <div className={classes.commentHead}>
                <Avatar className={classes.commentAvatar}>{renderAvatar(comment.name)}</Avatar>
                <Typography variant="body2" color="textPrimary" component="p">
                    {comment.name}
                </Typography>
            </div>
            {/* <Typography paragraph>{comment.description}</Typography> */}
            <Typography variant="body2" color="textPrimary" component="p" className={classes.commentDescription}>
                {comment.description}
            </Typography>
        </Paper>
    })
  }

  const handleLike = (e) => {
    props.likePost(props.user.token ,props.data._id);
  }

  const handleCommentSubmit = (e) => {
    const comment = {
      description: value
    }
    setValue('');
    props.commentPost(props.user.token, props.data._id, comment);
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {/* {renderAvatar(props.data.owner_name)} */}
            {props.data.owner_id.avatar ? <img className={classes.avatarImg} src={`data:image/jpg;base64,${props.data.owner_id.avatar}`}/> : renderAvatar(props.data.owner_id.name)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link to={{pathname: `/visit/${props.data.owner_id._id}`}} className={classes.owner_name}>{props.data.owner_id.name}</Link>}
        subheader= {getDate()}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {props.data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.icons}>
      {props.data.likes.some(like => like.likedById.toString() === props.user.user._id.toString()) ? 
        <IconButton aria-label="add to favorites" className={classes.likedButton} onClick={(e) => handleLike(e)}>
          <FavoriteIcon />
        </IconButton> : 
        <IconButton aria-label="add to favorites"  onClick={(e) => handleLike(e)}>
          <FavoriteIcon />
        </IconButton>}
        <Typography color="textSecondary" gutterBottom>
          {props.data.likes.length} likes
        </Typography>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <CommentIcon />
        </IconButton>
        <Typography color="textSecondary" gutterBottom>
          {props.data.comments.length} comments
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse}>
        <CardContent>
          <div className={classes.postComment}>
            <TextField
                  id="standard-multiline-flexible"
                  label="Write a comment..."
                  multiline
                  rowsMax={4}
                  value={value}
                  onChange={handleChange}
                  className={classes.textfield}
              />
              <Button color="primary" variant="contained" className={classes.postCommentDiv} onClick={(e) => handleCommentSubmit(e)}>Post</Button>
          </div>
            {renderComments()}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => {
  return{
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    likePost: (token, postId) => {dispatch(likePost(token, postId))},
    commentPost: (token, postId, comment) => {dispatch(commentPost(token, postId, comment))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostCard);