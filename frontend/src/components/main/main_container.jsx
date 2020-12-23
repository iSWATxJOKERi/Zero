import { connect } from 'react-redux';
import { addItem } from '../../actions/cart_actions';
import { fetchItems } from '../../actions/item_actions';
import Main from './main';


const mapStateToProps = state => {
    return {
        errors: state.session.errors,
        items: state.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(fetchItems()),
        addItemToCart: (item, user_id) => dispatch(addItem(item, user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);