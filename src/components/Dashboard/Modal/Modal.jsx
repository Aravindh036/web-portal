import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component {

    new = ()=>{
        var title = document.getElementById('title').value;
        var email = sessionStorage.getItem('email');
        fetch('https://02476d4d.ngrok.io/dashboard/'+email,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:title,doc:new Date().toISOString()})
        })
        .then(res=>{
            if(res.status === 200){
                sessionStorage.setItem('title',title);
                sessionStorage.setItem('json',null);
                document.location = '/editor'
            }
            else if(res.status === 409){
                alert('Architecture name already exists')
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
        sessionStorage.setItem('title',title);
        sessionStorage.setItem('json',null);
        document.location = '/editor'
    }

    render() {
        return (
            <div className="modal hide-modal" id="modal-id" > 
                <div className="modal-heading">Template Name</div>
                <div className="input-container">
                    <input id = "title" type="text"/>
                </div>
                <div className="buttons-modal">
                    <button onClick={this.new} className="ok">Ok</button>
                    <button className="cancel" onClick={this.props.modal} >Cancel</button>
                </div>
            </div>
        );
    }
}

export default Modal;