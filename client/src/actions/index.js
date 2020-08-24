import users from '../api/users';
import posts from '../api/posts';

export const signIn = (user) => async dispatch =>{
    try{
        // users.post('/login', user)
        // .then((response)=>{
        //     console.log(response);
        //     if(response.status === 200){
        //         dispatch({type: 'SIGN_IN', payload:{
        //             user: response.data.user,
        //             token: response.data.token
        //         }})
        //     }else{
        //         console.log('hi')
        //         return;
        //     }
        // })
        // .catch(error =>{
        //     dispatch({type:'INVALID_CREDENTIALS'})
        // })
        const response = await users.post('/login', user);
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+response.data.token
                }
            });
            dispatch({type: 'SIGN_IN', payload:{
                user: response.data.user,
                token: response.data.token,
                posts: responsePosts.data
            }});
            dispatch({type: 'NO_ERROR'});
        }
    }catch(error){
        dispatch({type: 'INVALID_CREDENTIALS'});
        console.log(error);
    }
}
export const signUp = (user) => async dispatch =>{
    try{
        const response = await users.post('/', user);
        console.log(response);
        if(response.status === 201){
            dispatch({type: 'SIGN_IN', payload:{
                user: response.data.user,
                token: response.data.token
            }})
        }else{
            return;
        }
    }catch(error){
        dispatch({type: 'INVALID_CREDENTIALS'});
        console.log(error);
    }
}

export const createPost = (post, token) => async dispatch => {
    const response = await posts.post('/', post, {
        headers: {
            authorization: 'Bearer '+ token
        }
    });
    if(response.status === 201){
        const responsePosts = await posts.get('/', {
            headers: {
                authorization: 'Bearer '+ token
            }
        })
        dispatch({type: 'REFRESH_POSTS', payload: {
            posts: responsePosts.data
        }})
    }
}

export const follow = (token, userId) => async dispatch => {
    try{
        const response = await users.patch(`/follow/${userId}`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+ token
                }
            })
            dispatch({type:'REFRESH_USER', payload: {
                user: response.data.user,
                posts: responsePosts.data
            }})
        }
    }catch(error){
        console.log(error);
    }
}

export const unFollow = (token, userId) => async dispatch => {
    try{
        const response = await users.patch(`/unfollow/${userId}`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+ token
                }
            })
            dispatch({type:'REFRESH_USER', payload: {
                user: response.data.user,
                posts: responsePosts.data
            }})
        }
    }catch(error){
        console.log(error);
    }
}

export const addProfilePicture = (token, file) => async dispatch => {
    try{
        const response = await users.post('/me/avatar', file, {
            headers: {
                contentType: 'multipart/form-data',
                authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+ token
                }
            })
            dispatch({type:'REFRESH_USER', payload: {
                user: response.data,
                posts: responsePosts.data
            }})
        }
    }catch(error){
        console.log(error);
    }
}

export const changePassword = (token, data) => async dispatch => {
    try{
        const response = await users.patch('/me', data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if(response.status === 200){
            alert('Password Changed!');
        }
    }catch(error){
        console.log(error);
    }
}

export const likePost = (token, postId) => async dispatch => {
    try{
        const response = await posts.patch(`/like/${postId}`, {} ,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+ token
                }
            })
            dispatch({type: 'REFRESH_POSTS', payload: {
                posts: responsePosts.data
            }})
        }
    }catch(error){
        console.log(error);
    }
}

export const commentPost = (token, postId, comment)=> async dispatch => {
    try{
        const response = await posts.patch(`/comment/${postId}`, comment, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const responsePosts = await posts.get('/', {
                headers: {
                    authorization: 'Bearer '+ token
                }
            })
            dispatch({type: 'REFRESH_POSTS', payload: {
                posts: responsePosts.data
            }})
        }
    }catch(error){
        console.log(error);
    }
}

export const logout = (token) => async dispatch => {
    try{
        const response = await users.post('/logout', {} , {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            dispatch({type: 'LOGOUT'});
        }
    }catch(error){
        console.log(error);
    }
}

export const logoutAll = (token) => async dispatch => {
    try{
        const response = await users.post('/logoutAll', {} , {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            dispatch({type: 'LOGOUT'});
        }
    }catch(error){
        console.log(error);
    }
}