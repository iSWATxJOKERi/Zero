import * as ItemApiUtil from '../util/item_api_util';

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export const RECEIVE_ITEM = "RECEIVE_ITEM";

const receiveItems = items => {
    return {
        type: RECEIVE_ITEMS,
        items
    }
}

const receiveItem = item => {
    return {
        type: RECEIVE_ITEM,
        item
    }
}

export const fetchItems = () => dispatch => {
    return ItemApiUtil.fetchItems().then(items => {
        dispatch(receiveItems(items.data))
    }, errors => {
        // dispatch(receiveItemErrors(errors))
    })
}

export const createItem = item => dispatch => {
    return ItemApiUtil.createItem(item).then(item => {
        dispatch(receiveItem(item.data))
    })
}