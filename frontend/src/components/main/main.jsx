import React from 'react';
import SessionContainer from './session_container';
import '../../stylesheets/main.scss';
import Item from './item';
import Cart from './cart';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            loggedin: this.props.currentUser,
            fetchedCart: false
        }
        this.toggleShow = this.toggleShow.bind(this);
        this.signout = this.signout.bind(this);
    }

    componentDidMount() {
        this.props.getItems().then(() => {
            if(this.props.currentUser) {
                this.props.getCart(this.props.currentUser.id).then(() => {
                    this.setState({
                        fetchedCart: true
                    })
                })
            }
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.currentUser !== prevProps.currentUser) {
            this.setState({
                loggedin: this.props.currentUser
            })
        }
    }

    toggleShow() {
        const s = this.state.signin;
        this.setState({
            signin: !s
        })
    }

    signout () {
        this.props.leave();
    }

    render() {
        let arr = [];
        let a2 = [];
        if(this.props.items) {
            let pieces = Object.keys(this.props.items);
            for(let i = 0; i < pieces.length; i++) {
                for(let j = 0; j < this.props.items[pieces[i]].length; j++) {
                    arr.push(<Item key={ this.props.items[pieces[i]][j]._id } allProps={ this.props } item={ this.props.items[pieces[i]][j] } />)
                    a2.push(this.props.items[pieces[i]][j]);
                }
            }
        }
        let btn = <button className="show" onClick={ this.toggleShow }>Login or Signup to add items to cart</button>;
        let show =  this.state.loggedin ? null : (this.state.signin ? <SessionContainer /> : btn);
        let logout = <h1 id="logout" onClick={ this.signout }>LOGOUT</h1>
        return (
            <section className="splash">
                <h1 id="title">ZERO GROCERY</h1>
                { this.state.loggedin ? <div>{ logout } <Cart items={ a2 } allProps={ this.props } cart={ this.props.cart }/> </div> : null }
                <div id="bottom">
                    <div className="itemlist">{ arr.length === 0 ? <span>No items in the store.</span> : arr }</div>
                    { show }
                </div>
            </section>
        );
    }
}

export default Main;