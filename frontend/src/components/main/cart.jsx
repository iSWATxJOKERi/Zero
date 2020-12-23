import React from 'react';
import CartItem from './cart_item';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: false
        }
        this.toggleCart = this.toggleCart.bind(this);
    }

    toggleCart() {
        let cs = this.state.cart;
        this.setState({
            cart : !cs
        })
    }

    render() {
        let arr = [];
        let obj = {};
        for(let j = 0; j < this.props.items.length; j++) {
            obj[this.props.items[j]._id] = this.props.items[j]
        }
        console.log(obj);
        console.log(arr);
        if(this.props.cart.items) {
            for(let i = 0; i < this.props.cart.items.length; i++) {
                if(obj[this.props.cart.items[i]]) {
                    arr.push(<CartItem key={ i } item={ obj[this.props.cart.items[i]] } />)
                }
            }
        }
        return (
            <section className="cart-container">
                <span className="cart-btn" onClick={ this.toggleCart }>YOUR CART</span>
                <div className={ this.state.cart ? "cart" : "hide" } onClick={ this.toggleCart }>
                    { arr.length > 0 ? arr : "EMPTY. CLICK ITEM TO ADD TO CART." }
                </div>
            </section>
        )
    }
}

export default Cart;