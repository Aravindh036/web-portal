import React, { Component } from 'react';

import './ResourcesType.css';
import instance from '../../../assets/instance.png';
class ResourcesType extends Component {
    image = document.createElement("img");
    dragstart = (e)=>{
        if(e.target.innerHTML === "Instance"){
            e.dataTransfer.setData("type","instance");
            e.dataTransfer.setDragImage(this.image,10,10)
        }
    }
    mouseDown = (e)=>{
        if(e.target.innerHTML === "Instance"){
            this.image.src = instance;
        }
    }
    render() {
        return (
            <div className="resource-container" >
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Instance</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Auto Scaling Batch</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">EC2</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Subnet</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Security Group</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Load Balancer</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Cloud9</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Cloud Front</div>
                <div draggable={true} onDragStart={(e)=>this.dragstart(e)} className="resource-items">S3</div>
            </div>
        );
    }
}

export default ResourcesType;