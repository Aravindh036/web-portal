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
        var svg = ()=>{
            console.log(this.props.title);
            return (
`<svg top=0
    width="100%"
    height="100%"
viewBox = '0 0 1223 583'>
    <foreignObject x=0 y=0 width='100%' height='110%'>
        ${this.props.preview === null?`<div width='100%'></div>`:this.props.preview}
    </foreignObject>
</svg>`
            )
        };
        var svg_elem = svg();
        var canvas = this.preview;
        canvas.innerHTML = svg_elem;
    }

    render() {
        return (
            <div onClick={this.select} className="card-container" >
                <div ref={ref=>this.preview=ref} className="card-preview">
                    
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