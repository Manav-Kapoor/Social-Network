import axios from 'axios';

export default axios.create({
    baseURL: 'https://inkit.herokuapp.com/users'
})