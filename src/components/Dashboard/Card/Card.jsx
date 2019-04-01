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

    delete = (e)=>{
        fetch('https://02476d4d.ngrok.io/delete',{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:this.props.title})
        })
        .then(res=>{
            if(res.status === 200){
                document.location.reload();
            }
        })
    }

    render() {
        return (
            <div className="card-container" >
                <div onClick={this.select} ref={ref=>this.preview=ref} className="card-preview">
                    <img width="100%" height="100%" src = {this.props.preview} alt="No preview available"/>
                </div>
                <div className="card-details">
                    <div onClick={this.select} className="project-details">
                        <div className="card-name">{this.props.title}</div>
                        <div className="card-date">Created On :  {this.props.doc}</div>
                    </div>
                    <div onClick={this.select} className="temp"></div>
                    <div onClick={this.delete} className="delete-card">
                        <img src={delete_icon} alt="🗑️"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;