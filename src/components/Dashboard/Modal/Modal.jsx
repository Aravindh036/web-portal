import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component {
    render() {
        return (
            <div className="modal hide-modal" id="modal-id" > 
                <div className="modal-heading">Template Name</div>
                <div className="input-container">
                    <input type="text"/>
                </div>
                <div className="buttons-modal">
                    <button className="ok">Ok</button>
                    <button className="cancel" onClick={this.props.modal} >Cancel</button>
                </div>
            </div>
        );
    }
}

export default Modal;