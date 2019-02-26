import React, { Component } from 'react';

import './Card.css';

import delete_icon from '../../../assets/delete.png';
import preview from '../../../assets/preview.png';

class Card extends Component {
    render() {
        return (
            <div className="card-container" >
                <div className="card-preview">
                    <img src={preview} alt="P"/>
                </div>
                <div className="card-details">
                    <div className="project-details">
                        <div className="card-name">{this.props.title}</div>
                        <div className="card-date">Created On :  {this.props.doc}</div>
                    </div>
                    <div className="delete-card">
                        <img src={delete_icon} alt="🗑️"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;