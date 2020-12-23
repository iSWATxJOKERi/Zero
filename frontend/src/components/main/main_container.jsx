import { connect } from 'react-redux';
import { addItem, fetchCart } from '../../actions/cart_actions';
import { fetchItems } from '../../actions/item_actions';
import { logout } from '../../actions/session_actions';
import Main from './main';


const mapStateToProps = state => {
    return {
        currentUser: state.session.user,
        errors: state.session.errors,
        items: state.items,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(fetchItems()),
        addItemToCart: (item, user_id) => dispatch(addItem(item, user_id)),
        leave: () => dispatch(logout()),
        getCart: user_id => dispatch(fetchCart(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);