import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            handle: "",
            password: "",
            password2: "",
            loggedin: this.props.currentUser
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
                this.props.getCart(u.id)
            })
        } else {
            this.props.processSignup(user).then(u => {
                // console.log(u);
                // let cu = jwt_decode(u.token)
                this.props.newCart(u.id)
            })
        }

    }

    render() {
        // console.log(this.state);
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
            </section>
        )
    }
}

export default SessionForm;