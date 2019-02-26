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
                        <div className="card-name">Untitled-1</div>
                        <div className="card-date">Last Modified :  07/08/2019</div>
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