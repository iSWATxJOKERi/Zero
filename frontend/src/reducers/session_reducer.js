import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: null
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                isAuthenticated: !!action.user,
                user: action.user
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
}

export default sessionReducer;