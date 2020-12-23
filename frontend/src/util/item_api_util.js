import axios from "axios"

export const fetchItems = () => {
    return axios.get('/api/items/all');
}

export const createItem = item => {
    return axios.post('/api/item/new', item);
}