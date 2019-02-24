import React, { Component } from 'react';

import './Login.css';

import logo from '../../assets/logo.png';
import editor from '../../assets/editor.png';

class Login extends Component {
    state = {
        login: true,
        signup: false
    };
    getLogin = () => {
        if (this.state.login !== true) {
            this.setState({
                login: true,
                signup: false
            });
            document.getElementById("form-line-id").classList.toggle("move-line-right");
        }
    }
    getSignup = () => {
        if (this.state.signup !== true) {
            this.setState({
                login: false,
                signup: true
            });
            document.getElementById("form-line-id").classList.toggle("move-line-right");
        }
    }
    render() {
        return (
            <div className="home-container" >
                <div className="home-image">
                    <img src={logo} alt="su"/>
                    <div className="form-container">
                        <div className="login-signup">
                            <div className="login" onClick={this.getLogin} >Login</div>
                            <div className="signup" onClick={this.getSignup} >Sign up</div>
                            <div id="form-line-id" className="under-line-form"></div>
                        </div>
                        <div className="login-signup-form">
                            {this.state.login === true ?
                                <div className="login-form">
                                    <div className="align-start">
                                        <label>Email</label>
                                        <input type="text" />
                                    </div>
                                    <div className="align-start">
                                        <label>Password</label>
                                        <input type="password" />
                                    </div>
                                    <button className="form-button">Login</button>
                                </div> : null}
                            {this.state.signup === true ?
                                <div className="signup-form">
                                    <div className="align-start">
                                        <label>Email</label>
                                        <input type="text" />
                                    </div>
                                    <div className="align-start">
                                        <label>Password</label>
                                        <input type="password" />
                                    </div>
                                    <button className="form-button">Signup</button>
                                </div> : null}
                        </div>
                    </div>
                </div>
                <div className="editor-image">
                    <img src={editor} alt="editor"/>
                </div>
            </div>
        );
    }
}

export default Login;