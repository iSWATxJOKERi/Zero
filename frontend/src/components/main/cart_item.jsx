import React from 'react';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);

        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart() {
        // console.log(this.props)
        if(this.props.allProps.currentUser) {
            this.props.allProps.removeItemFromCart(this.props.item, this.props.allProps.currentUser.id).then(() => {
                this.props.allProps.getCart(this.props.allProps.currentUser.id)
            })
        } else {
            alert("Please create account or sign-in to add items to cart :)");
        }
    }

    render() {
        return (
            <div className="item2" onClick={ this.removeFromCart }>
                <span>Name: { this.props.item.name }</span>
                <span>Price: ${ this.props.item.price }</span>
            </div>
        )
    }
}