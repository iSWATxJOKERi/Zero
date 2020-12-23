import axios from 'axios';

export const addItem = (item, user_id) => {
    return axios.patch(`/add/${ user_id }`, item)
}

export const createCart = (user_id) => {
    return axios.post(`/new/${ user_id }`)
}

export const fetchCart = id => {
    return axios.get(`/get/${ id }`)
}