import { connect } from 'react-redux';
import { createCart, fetchCart } from '../../actions/cart_actions';
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => {
    return {
        errors: state.session.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processSignup: user => dispatch(signup(user)),
        processLogin: user => dispatch(login(user)),
        newCart: user_id => dispatch(createCart(user_id)),
        getCart: user_id => dispatch(fetchCart(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);