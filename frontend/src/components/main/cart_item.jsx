import React from 'react';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);

        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart() {
        // this.props.allProps.removeFromCart(this.props.item, this.props.allProps.currentUser.id).then(() => {
        //     this.props.allProps.fetchCart(this.props.allProps.currentUser.id)
        // })
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