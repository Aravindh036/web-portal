import React, { Component } from 'react';

import './ResourcesType.css';
import instance from '../../../assets/instance.png';
import dbinstance from '../../../assets/dbserver.png';
import subnet from '../../../assets/subnet.png';
import dbsubnet from '../../../assets/dbsubnet.png';
import cwatch from '../../../assets/cwatch.png';
import lbalancer from '../../../assets/lbalance.png';
import sg from '../../../assets/sg.png';
class ResourcesType extends Component {
    image = document.createElement("img");
    dragstart = (e)=>{
        if(e.target.innerHTML === "Instance"){
            e.dataTransfer.setData("type","instance");
        }
        else if(e.target.innerHTML === "DB Instance"){
            e.dataTransfer.setData("type","dbinstance");
        }
        else if(e.target.innerHTML === "Cloud Watch"){
            e.dataTransfer.setData("type","cwatch");
        }
        else if(e.target.innerHTML === "Subnet"){
            e.dataTransfer.setData("type","subnet");
        }
        else if(e.target.innerHTML === "DB Subnet"){
            e.dataTransfer.setData("type","dbsubnet");
        }
        else if(e.target.innerHTML === "Load Balancer"){
            e.dataTransfer.setData("type","lbalancer");
        }
        else if(e.target.innerHTML === "Security Group"){
            e.dataTransfer.setData("type","sg");
        }
        e.dataTransfer.setDragImage(this.image,10,10)
    }
    mouseDown = (e)=>{
        if(e.target.innerHTML === "Instance"){
            this.image.src = instance;
        }
        else if(e.target.innerHTML === "DB Instance"){
            this.image.src = dbinstance;
        }
        else if(e.target.innerHTML === "Cloud Watch"){
            this.image.src = cwatch;
        }
        else if(e.target.innerHTML === "Subnet"){
            this.image.src = subnet;
        }
        else if(e.target.innerHTML === "DB Subnet"){
            this.image.src = dbsubnet;
        }
        else if(e.target.innerHTML === "Load Balancer"){
            this.image.src = lbalancer;
        }
        else if(e.target.innerHTML === "Security Group"){
            this.image.src = sg;
        }
    }
    render() {
        return (
            <div className="resource-container" >
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Instance</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">DB Instance</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Subnet</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">DB Subnet</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Security Group</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Load Balancer</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Cloud Watch</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Lambda Function</div>
                <div draggable={true} onMouseDown={this.mouseDown} onDragStart={(e)=>this.dragstart(e)} className="resource-items">Bot</div>
            </div>
        );
    }
}

export default ResourcesType;