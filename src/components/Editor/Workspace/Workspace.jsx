import React, { Component } from 'react';
import instance from '../../../assets/instance.png';

class Workspace extends Component {

    down = (e)=>{
        this.drag_elem = e.target;
    }

    up = (e)=>{
        this.drag_elem = undefined;
    }

    drop = (e)=>{
        // e.preventDefault();
        var type = e.dataTransfer.getData("type");
        var workspace = document.getElementById('workspace');
        if(type === "instance"){
            var image = document.createElement("img");
            image.setAttribute("class","instance");
            image.setAttribute("src",instance);
            image.style.left = e.pageX-workspace.offsetLeft + "px";
            image.style.top = e.pageY-workspace.offsetTop + "px";
            image.style.position = "absolute";
            image.addEventListener("mousedown",this.down);
            image.addEventListener("mouseup",this.up);
            image.addEventListener("dragstart",(e)=>e.preventDefault);
            image.draggable = false;
            workspace.appendChild(image);
        }
    }

    mouseover = (e)=>{
        if(this.drag_elem){
            var workspace = document.getElementById('workspace');
            if(this.drag_elem){
                this.drag_elem.style.left = e.pageX-workspace.offsetLeft + "px";
                this.drag_elem.style.top = e.pageY-workspace.offsetTop + "px";
            }
        }
    }
    
    dragOver = (e)=>{
        e.preventDefault();
    }
    
    render() {
        return (
            <div id = "workspace" onMouseMove = {(e)=>this.mouseover(e)} onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.dragOver(e)} className="work-space">
                
            </div>
        );
    }
}

export default Workspace;