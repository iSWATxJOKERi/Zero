import { combineReducers } from 'redux';
import cartReducer from './cart_reducer';
import errorsReducer from './errors_reducer';
import itemsReducer from './items_reducer';
import sessionReducer from './session_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  items: itemsReducer,
  cart: cartReducer
});

export default RootReducer;