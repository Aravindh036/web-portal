import React, { Component } from 'react';
import instance from '../../../assets/instance.png';
import dbinstance from '../../../assets/dbserver.png';
import subnet from '../../../assets/subnet.png';
import dbsubnet from '../../../assets/dbsubnet.png';
import cwatch from '../../../assets/cwatch.png';
import lbalencer from '../../../assets/lbalance.png';
import sg from '../../../assets/sg.png';




class Workspace extends Component {

    down = (e)=>{
        if(e.button === 2){
            e.preventDefault();
            var property = document.getElementById("properties");
            document.getElementById("properties").style.right = "0px";
            return false;
        }
        else if(e.button === 0){
            this.drag_elem = e.target;
            this.drag_elem.style.border = "1px solid rgba(33,249,207,0.5)";
            this.drag_elem.style.boxShadow = "0px 0px 10px rgba(33,249,207,0.6)";
            window.addEventListener("mouseup",this.up);
        }
    }

    up = (e)=>{
        if(!this.drag_elem){
            return false;
        }
        this.drag_elem.style.border = "";
        this.drag_elem.style.boxShadow = "";
        window.addEventListener("mouseup",null);
        this.drag_elem = undefined;
    }

    dblclick = (e)=>{
        e.target.style.border = "1px solid rgba(33,249,207,0.5)";
        e.target.style.boxShadow = "0px 0px 10px rgba(33,249,207,0.6)";
        document.getElementById("properties").style.right = "0px";
        console.log("double click");
    }

    drop = (e)=>{
        console.log(e.target);
        var type = e.dataTransfer.getData("type");
        var workspace = document.getElementById('workspace');
        var image = document.createElement("img");
        image.setAttribute("class",type);
        image.style.left = e.pageX-workspace.offsetLeft + "px";
        image.style.top = e.pageY-workspace.offsetTop + "px";
        image.style.width = "90px"
        image.style.position = "absolute";
        image.style.transition = "all 0.02s";
        image.addEventListener("mousedown",this.down);
        image.addEventListener("dblclick",this.dblclick);
        image.draggable = false;
        if(type === "instance"){
            image.setAttribute("src",instance);
            image.setAttribute("title","Instance");
        }
        else if(type === "dbinstance"){
            image.setAttribute("src",dbinstance);
            image.setAttribute("title","DB Instance");

        }
        else if(type === "cwatch"){
            image.setAttribute("src",cwatch);
            image.setAttribute("title","Cloud Watch");

        }
        else if(type === "subnet"){
            image.setAttribute("src",subnet);
            image.setAttribute("title","Subnet");

        }
        else if(type === "dbsubnet"){
            image.setAttribute("src",dbsubnet);
            image.setAttribute("title","DB Subnet");

        }
        else if(type === "lbalencer"){
            image.setAttribute("src",lbalencer);
            image.setAttribute("title","Load Balancer");

        }
        else if(type === "sg"){
            image.setAttribute("src",sg);
            image.setAttribute("title","Security Group");
        }
        workspace.appendChild(image);
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
            <div id = "workspace" onClick={(e)=>document.getElementById("properties").style.right = "-314px"} onMouseMove = {(e)=>this.mouseover(e)} onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.dragOver(e)} className="work-space">
                
            </div>
        );
    }
}

export default Workspace;