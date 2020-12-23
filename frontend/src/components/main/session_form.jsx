import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            username: "",
            password: "",
            password2: ""
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        let state = this.state.login;
        this.setState({
            login: !state
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
            username: this.state.username, password: this.state.password
        } : {
            username: this.state.username, password: this.state.password
        }
        e.preventDefault();
        const user = Object.assign({}, form);

        if(this.state.login) {
            this.props.processLogin(user).then(user => {
                this.props.getCart(user._id)
            })
        } else {
            this.props.processSignup(user).then(user => {
                this.props.newCart(user._id)
            })
        }

    }

    render() {
        return (
            <section className="session-container">
                <section className={ this.state.login ? "hide": "signup-container"}>
                    <form className="signup-form" onSubmit={ this.handleSubmit }>
                        <input className="username-input" type="text" placeholder="Username" onChange={ this.handleInput('username') }></input>
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
                        <input className="username-login" type="text" placeholder="Username or Email Address"></input>
                        <input className="password-login" type="password" placeholder="Password"></input>
                        <div className="forgot-pass-container">
                            <span onClick={ this.toggleForm }>Don't have an account? Create one here.</span>
                        </div>
                        <button className="create-session">Sign In</button>
                    </form>
                </section>
            </section>
        )
    }
}

export default SessionForm;