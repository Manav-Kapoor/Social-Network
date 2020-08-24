const initialState = {
    isLoggedIn: null,
    user: {},
    posts: []
}

export const user = (state = initialState, action)=>{
    switch(action.type){
        case 'SIGN_IN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
                posts: action.payload.posts ? action.payload.posts : []
            }
        case 'REFRESH_POSTS':
            return {
                ...state,
                posts: action.payload.posts
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                token: '',
                posts: []
            }
        case 'REFRESH_USER':
            return {
                ...state,
                user: action.payload.user,
                posts: action.payload.posts
            }
        default:
            return state;
    }
}

export const errors = (state = {}, action) =>{
    switch(action.type){
        case 'INVALID_CREDENTIALS':
            return{
                ...state,
                isError: true,
                error: 'Invalid Credentials'
            }
        case 'NO_ERROR':
            return {}
        default:
            return state
    }
}