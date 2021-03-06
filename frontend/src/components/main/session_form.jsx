import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            handle: "",
            password: "",
            password2: "",
            loggedin: this.props.currentUser,
            errors: []
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.currentUser !== prevProps.currentUser) {
            this.setState({
                loggedin: this.props.currentUser
            })
        }
    }

    toggleForm() {
        let state = this.state.login;
        document.getElementsByClassName("password-login")[0].value = "";
        document.getElementsByClassName("password-input")[0].value = "";
        document.getElementsByClassName("password-match")[0].value = "";
        document.getElementsByClassName("username-input")[0].value = "";
        document.getElementsByClassName("username-login")[0].value = "";
        this.setState({
            login: !state,
            handle: "",
            password: "",
            password2: "",
            errors: []
        })
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field] : e.currentTarget.value
            })
        }
    }

    handleSubmit(e) {
        let form = this.state.login ? {
            handle: this.state.handle, password: this.state.password
        } : {
            handle: this.state.handle, password: this.state.password, password2: this.state.password2
        }
        e.preventDefault();
        const user = Object.assign({}, form);

        if(this.state.login) {
            this.props.processLogin(user).then(u => {
                // console.log(u);
                // let cu = jwt_decode(u.token)
                if(u) {
                    this.props.getCart(u.id)
                } else {
                    this.setState({
                        errors: this.props.errors.session
                    })
                }
            })
        } else {
            this.props.processSignup(user).then(u => {
                // console.log(u);
                // let cu = jwt_decode(u.token)
                if(u) {
                    this.props.newCart(u.id)
                } else {
                    this.setState({
                        errors: this.props.errors.session
                    })
                }
            })
        }

    }

    render() {
        // console.log(this.state);
        let arr = [];
        for(let i = 0; i < this.state.errors.length; i++) {
            arr.push(<li className="errors" key={ i }>{ this.state.errors[i] }</li>)
        }
        return (
            <section className="session-container">
                <section className={ this.state.login ? "hide": "signup-container"}>
                    <form className="signup-form" onSubmit={ this.handleSubmit }>
                        <input className="username-input" type="text" placeholder="Handle" onChange={ this.handleInput('handle') }></input>
                        <div className="passbox">
                            <input className="password-input" type="password" placeholder="Password" onChange={ this.handleInput('password') }></input>
                            <input className="password-match" type="password" placeholder="Confirm password" onChange={ this.handleInput('password2') }></input>
                        </div>
                        <button className="create-session2">Create your account</button>
                        <span onClick={ this.toggleForm }>Sign In</span>
                    </form>
                </section>
                <section className={ this.state.login ? "login-container" : "hide" }>
                    <form className="login-form" onSubmit={ this.handleSubmit }>
                        <input className="username-login" type="text" placeholder="Handle" onChange={ this.handleInput('handle') }></input>
                        <input className="password-login" type="password" placeholder="Password" onChange={ this.handleInput('password') }></input>
                        <div className="forgot-pass-container">
                            <span onClick={ this.toggleForm }>Don't have an account? Create one here.</span>
                        </div>
                        <button className="create-session">Sign In</button>
                    </form>
                </section>
                { arr }
            </section>
        )
    }
}

export default SessionForm;