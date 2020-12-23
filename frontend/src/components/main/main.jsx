import React from 'react';
import SessionContainer from './session_container';
import '../../stylesheets/main.scss';
import Item from './item';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            loggedin: false
        }
        this.toggleShow = this.toggleShow.bind(this);
    }

    componentDidMount() {
        this.props.getItems();
    }

    toggleShow() {
        const s = this.state.signin;
        this.setState({
            signin: !s
        })
    }

    render() {
        let arr = [];
        if(this.props.items) {
            let pieces = Object.keys(this.props.items);
            for(let i = 0; i < pieces.length; i++) {
                for(let j = 0; j < this.props.items[pieces[i]].length; j++) {
                    arr.push(<Item key={ this.props.items[pieces[i]][j]._id } allProps={ this.props } item={ this.props.items[pieces[i]][j] } />)
                }
            }
        }
        let btn = <button className="show" onClick={ this.toggleShow }>Login or Signup to add items to cart</button>;
        let show =  this.state.loggedin ? null : (this.state.signin ? <SessionContainer /> : btn);
        return (
            <section className="splash">
                <h1>ZERO GROCERY</h1>
                <div className="itemlist">{ arr.length === 0 ? <span>No items in the store.</span> : arr }</div>
                { show }
            </section>
        );
    }
}

export default Main;