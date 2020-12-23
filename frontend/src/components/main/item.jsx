import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        if(this.props.allProps.currentUser) {
            this.props.allProps.addItemToCart(this.props.item, this.props.allProps.currentUser.id).then(() => {
                this.props.allProps.getCart(this.props.allProps.currentUser.id)
            })
        } else {
            alert("Please create account or sign-in to add items to cart :)");
        }
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