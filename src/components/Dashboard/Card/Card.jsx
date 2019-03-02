import React, { Component } from 'react';

import './Card.css';

import delete_icon from '../../../assets/delete.png';
import preview from '../../../assets/preview.png';

class Card extends Component {

    select = ()=>{
        sessionStorage.setItem('json',this.props.json);
        sessionStorage.setItem('title',this.props.title);
        document.location = "editor"
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div onClick={this.select} className="card-container" >
                <div ref={ref=>this.preview=ref} className="card-preview">
                    <img width="100%" height="100%" src = {this.props.preview} alt="No preview available"/>
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