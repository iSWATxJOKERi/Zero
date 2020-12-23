import axios from 'axios';

export const addItem = (item, user_id) => {
    return axios({
        method: 'patch',
        url: '/api/cart/add',
        data: item,
        params: {
            id: user_id
        }
    })
}

export const removeItem = (item, user_id) => {
    return axios({
        method: 'patch',
        url: '/api/cart/remove',
        data: item,
        params: {
            id: user_id
        }
    })
}

export const createCart = (user_id) => {
    return axios({
        method: 'post',
        url: '/api/cart/create',
        params: {
            id: user_id
        }
    })
}

export const fetchCart = user_id => {
    return axios({
        method: 'get',
        url: '/api/cart/get',
        params: {
            id: user_id
        }
    })
}