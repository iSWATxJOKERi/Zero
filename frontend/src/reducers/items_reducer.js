import { RECEIVE_ITEM, RECEIVE_ITEMS } from '../actions/item_actions';

const itemsReducer = (state = null, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ITEMS:
            let obj = Object.assign({}, state);
            for(let i = 0; i < action.items.length; i++) {
                if(obj[action.items[i].name]) {
                    obj[action.items[i].name].push(action.items[i]);
                } else {
                    obj[action.items[i].name] = [action.items[i]];
                }
            }
            return obj;
        case RECEIVE_ITEM:
            let obj2 = Object.assign({}, state);
            if(obj2[action.item.name]) {
                obj2[action.item.name].push(action.item)
            } else {
                obj2[action.item.name] = action.item
            }
            return obj2;
        default:
            return state
    }
}

export default itemsReducer;