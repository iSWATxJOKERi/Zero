import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        this.props.allProps.addItemToCart().then(() => {
            this.props.allProps.fetchCart(this.props.currentUser._id)
        })
    }

    render() {
        return (
            <div className="item" onClick={ this.addToCart }>
                <span>Name: { this.props.item.name }</span>
                <span>Price: ${ this.props.item.price }</span>
            </div>
        )
    }
}