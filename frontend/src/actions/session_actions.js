import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});
  
export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const signup = user => dispatch => {
    return APIUtil.signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        // debugger
        dispatch(receiveCurrentUser(decoded))
        return decoded
    }).catch(errors => {
        dispatch(receiveSessionErrors(errors.response.data))
    })
};

export const login = user => dispatch => {
    return APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        // debugger
        dispatch(receiveCurrentUser(decoded))
        return decoded
    })
    .catch(errors => {
        dispatch(receiveSessionErrors(errors))
    })
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
};