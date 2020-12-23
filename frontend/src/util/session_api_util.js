import axios from 'axios';

export const signup = (user) => {
    return axios.post('/api/users/register', user);
};

export const login = user => {
    return axios.post('/api/users/login', user)
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};