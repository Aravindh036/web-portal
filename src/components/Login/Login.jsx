import React, { Component } from 'react';

import './Login.css';

import logo from '../../assets/logo.png';
import code from '../../assets/bg-code.png';
import workspace from '../../assets/bg-workspace.png';
import editor from '../../assets/editor.png';

class Login extends Component {
    state = {
        login: true,
        signup: false,
        left:true
    };
    constructor(){
        super();
        this.state.ref = setInterval(()=>{
            if(this.state.left){
                document.getElementById('gb-workflow').style.marginLeft = "-250%";
                this.setState({left:false});
            }
            else{
                document.getElementById('gb-workflow').style.marginLeft = "0%";
                this.setState({left:true});

            }
        },5000)
    }

    login = ()=>{
        var elements = document.getElementsByClassName('lin');
        var text = document.getElementById('lin-wrong');
        text.innerHTML = '';
        var email = elements[0].value;
        var pass = elements[1].value;
        // console.log(email,pass);
        fetch(`http://localhost:2019/login?email=${email}&password=${pass}`,{
            method:"GET",
        })
        .then(res=>{
            if(res.status === 200){
                sessionStorage.setItem('email',email)
                document.location = "/dashboard"
            }
            else if(res.status === 403){
                text.innerHTML = "*email or password wrong";
            }
            else if(res.status === 404){
                text.innerHTML = "*no user found";
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

    signup = ()=>{
        document.getElementsByClassName('pass-match')[1].style.display = "none";
        document.getElementsByClassName('pass-match')[0].style.display = "none";
        var elements = document.getElementsByClassName('sig');
        var email = elements[0].value;
        var uname = elements[1].value;
        var pass = elements[2].value;
        var access_key_id = elements[3].value;
        var secret_access_key = elements[4].value;
        var confirm_pass = document.getElementById('comf-pass').value;
        if(pass === confirm_pass){
            var that = this;
            fetch('http://localhost:2019/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    uname:uname,
                    email:email,
                    password:pass,
                    iam:access_key_id + ":" + secret_access_key
                })
            })
            .then(res=>{
                if(res.status === 200){
                    that.setState({
                        login: true,
                        signup: false
                    });
                    document.getElementById('singup-success').style.display = "inline";
                    document.getElementById("form-line-id").classList.toggle("move-line-right");
                }
                else if (res.status === 409){
                    document.getElementsByClassName('pass-match')[0].style.display = "inline";
                }
            })
            .catch(err=>{
                alert("network error try again");
                console.log(err.message);
            })
        }
        else{
            document.getElementsByClassName('pass-match')[1].style.display = "inline";
        }
    }

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
                    <div className="container">
                        <img src={logo} alt="su" />
                        <div className="form-container">
                            <div className="login-signup">
                                <div className="login" onClick={this.getLogin} >Login</div>
                                <div className="signup" onClick={this.getSignup} >Sign up</div>
                                <div id="form-line-id" className="under-line-form"></div>
                            </div>
                            <div className="success">
                                <span id="singup-success">Signup Successful Login to continue</span>
                            </div>
                            <div className="login-signup-form">
                                {this.state.login === true ?
                                    <div className="login-form">
                                        <div className="align-start">
                                            <label>Email</label>
                                            <input className = "lin" type="email" />
                                        </div>
                                        <div className="align-start">
                                            <label>Password</label>
                                            <input className = "lin" type="password" />
                                        </div>
                                        <span id="lin-wrong"></span>
                                        <button onClick = {this.login} className="form-button">Login</button>
                                    </div> : null}
                                {this.state.signup === true ?
                                    <div className="signup-form">
                                        <div className="password">
                                            <div className="align-start">
                                                <label>Email</label>
                                                <input value="eniyanilavan@gmail.com" className = "sig" type="email" />
                                            </div>
                                            <div className="align-start">
                                                <label>Nick Name</label>
                                                <input value="Eniyan" className = "sig" type="text" />
                                            </div>
                                        </div>
                                        <span className="pass-match">*user already exists</span>
                                        <div className="password">
                                            <div className="align-start">
                                                <label>Password</label>
                                                <input value="eniyan007" className = "sig" type="password" />
                                            </div>
                                            <div className="align-start">
                                                <label>Confirm Password</label>
                                                <input id = "comf-pass" type="password" />
                                            </div>
                                        </div>
                                        <span className="pass-match">*passwords does not match</span>
                                        <div className="password">
                                            <div className="align-start">
                                                <label>IAM - Access Key ID</label>
                                                <input value="access_key" className = "sig" type="password" />
                                            </div>
                                            <div className="align-start">
                                                <label>IAM - Secret Access Key</label>
                                                <input value="secret key" className = "sig" type="password" hidden={false}/>
                                            </div>
                                        </div>
                                        <button onClick={this.signup} className="form-button">Signup</button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="bg-image">
                        <img id = "gb-workflow" src= {workspace} alt="code"/>
                        <img id = "gb-code" src= {code} alt="code"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;