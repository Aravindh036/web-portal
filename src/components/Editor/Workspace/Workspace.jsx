import React, { Component } from 'react';
import instance from '../../../assets/instance.png';
import dbinstance from '../../../assets/dbserver.png';
import subnet from '../../../assets/subnet.png';
import dbsubnet from '../../../assets/dbsubnet.png';
import cwatch from '../../../assets/cwatch.png';
import lbalancer from '../../../assets/lbalance.png';
import sg from '../../../assets/sg.png';
import vpc from '../../../assets/vpc.png';
import bot from '../../../assets/bot.png';


class Workspace extends Component {

    componentDidMount(){
        this.json = sessionStorage.getItem('json');
        this.email = sessionStorage.getItem('email');
        this.title = sessionStorage.getItem('title');
        // console.log(this.json);
        if(!this.email || !this.title){
            document.location = "/";
        }
        if(this.json !== "null"){
            this.json_render(this.json);
        }
        window.addEventListener("keydown",this.delete);
    }

    componentWillUnmount(){
        window.removeEventListener("keydown",this.delete);
    }

    json_render = (json_str)=>{
        var json = JSON.parse(json_str);
        for(var i in json){
            var component = json[i];
            var x = component.properties.x;
            var y = component.properties.y;
            var type = component.serviceName;
            var prop = {
                id : i,
                x : x,
                y : y,
                type : type
            }
            this.draw(prop)
        }
    }


    down = (e)=>{
        this.down_pos_x = e.pageX;
        this.down_pos_y = e.pageY;
        if(e.button === 2){
            // e.preventDefault();
            // var property = document.getElementById("properties");
            // property.style.right = "0px";
            // this.props.changeProperty(e.target.className,e.target.offsetLeft,e.target.offsetTop);
            // document.getElementById('workspace').addEventListener("click",this.windowclick,true);
        }
        else if(e.button === 0){
            this.drag_elem = e.target;
            var workspace = document.getElementById('workspace');
            this.image_x = e.pageX - e.target.offsetLeft - workspace.offsetLeft;
            this.image_y = e.pageY - e.target.offsetTop - workspace.offsetTop;
            this.drag_elem.style.border = "1px solid rgba(33,249,207,0.5)";
            this.drag_elem.style.boxShadow = "0px 0px 10px rgba(33,249,207,0.6)";
            window.addEventListener("mouseup",this.up);
        }
        // console.log(e.target.id);
        this.props.currentID(e.target.id);
    }

    up = (e)=>{
        if(!this.drag_elem){
            return false;
        }
        this.drag_elem.style.border = "";
        this.drag_elem.style.boxShadow = "";
        window.removeEventListener("mouseup",this.up);
        this.drag_elem = undefined;
    }

    dblclick = (e)=>{
        e.target.style.border = "1px solid rgba(33,249,207,0.5)";
        e.target.style.boxShadow = "0px 0px 10px rgba(33,249,207,0.6)";
        document.getElementById("properties").style.right = "0px";
        this.props.changeProperty(e.target.className,e.target.offsetLeft,e.target.offsetTop);   
    }

    draw = (prop)=>{
        var type = prop.type;
        var workspace = document.getElementById('workspace');
        var image = document.createElement("img");
        image.id = prop.id;
        image.setAttribute("class",type);
        image.style.left = prop.x + "px";
        image.style.top = prop.y + "px";
        image.style.width = "90px"
        image.style.position = "absolute";
        image.style.transition = "all 0.02s";
        image.addEventListener("mousedown",this.down);
        image.addEventListener("dblclick",this.dblclick);
        image.addEventListener("click",this.click);
        image.addEventListener('contextmenu', event => event.preventDefault());
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
        else if(type === "lbalancer"){
            image.setAttribute("src",lbalancer);
            image.setAttribute("title","Load Balancer");

        }
        else if(type === "sg"){
            image.setAttribute("src",sg);
            image.setAttribute("title","Security Group");
        }
        else if(type === "vpc"){
            image.setAttribute("src",vpc);
            image.setAttribute("title","VPC");
        }
        else if(type === "bot"){
            image.setAttribute("src",bot);
            image.setAttribute("title","Bot");
        }
        workspace.appendChild(image);
        this.props.updateStore(type,image.id,prop.x-workspace.offsetLeft,prop.y-workspace.offsetTop);
    }

    delete = (e)=>{
        if(e.keyCode === 46 && this.select_elem){
            var select_elem = this.select_elem;
            var id = select_elem.id;
            this.props.delete(id);
            select_elem.parentNode.removeChild(select_elem);
            this.select_elem = undefined;
            var property = document.getElementById("properties");
            property.style.right = "-314px";
            document.getElementById('workspace').removeEventListener("click",this.windowclick,true);
        }
    }

    drop = (e)=>{
        var type = e.dataTransfer.getData("type");
        var workspace = document.getElementById('workspace');
        var image = document.createElement("img");
        image.id = type + Math.floor((Math.random()).toPrecision(4)*10000);
        image.setAttribute("class",type);
        image.style.left = e.pageX-workspace.offsetLeft + "px";
        image.style.top = e.pageY-workspace.offsetTop + "px";
        image.style.width = "90px"
        image.style.position = "absolute";
        // image.style.transition = "all 0.02s";
        // image.style.webkitTransition = "all 0.02s";
        image.addEventListener("mousedown",this.down);
        image.addEventListener("dblclick",this.dblclick);
        image.addEventListener("click",this.click);
        image.addEventListener('contextmenu', event => event.preventDefault());
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
        else if(type === "lbalancer"){
            image.setAttribute("src",lbalancer);
            image.setAttribute("title","Load Balancer");

        }
        else if(type === "sg"){
            image.setAttribute("src",sg);
            image.setAttribute("title","Security Group");
        }
        else if(type === "vpc"){
            image.setAttribute("src",vpc);
            image.setAttribute("title","VPC");
        }
        else if(type === "bot"){
            image.setAttribute("src",bot);
            image.setAttribute("title","Bot");
        }
        workspace.appendChild(image);
        this.props.updateStore(type,image.id,e.pageX-workspace.offsetLeft,e.pageY-workspace.offsetTop);
    }

    mouseover = (e)=>{
        if(this.drag_elem){
            var workspace = document.getElementById('workspace');
            if(this.drag_elem){
                var x = e.pageX - workspace.offsetLeft - this.image_x;
                var y =  e.pageY - workspace.offsetTop - this.image_y;
                if(x>0 && y>0 && x+this.drag_elem.width<workspace.clientWidth && y+this.drag_elem.height<workspace.clientHeight){
                    this.drag_elem.style.left = x + "px";
                    this.drag_elem.style.top = y + "px";
                    this.props.update_position(this.drag_elem.id,x,y);
                }
            }
        }
    }
    
    dragOver = (e)=>{
        e.preventDefault();
    }

    windowclick = (e)=>{
        // console.log(e.target);
        this.select_elem.style.border = "";
        this.select_elem.style.boxShadow = "";
        this.select_elem = undefined;
        var property = document.getElementById("properties");
        property.style.right = "-314px";
        document.getElementById('workspace').removeEventListener("click",this.windowclick,true);
    }

    click = (e)=>{
        if(this.down_pos_x === e.pageX && this.down_pos_y === e.pageY){
            this.select_elem = e.target;
            this.props.remove()
            this.props.changeProperty(e.target.className,e.target.offsetLeft,e.target.offsetTop);
            e.target.style.border = "1px solid rgba(33,249,207,0.5)";
            e.target.style.boxShadow = "0px 0px 10px rgba(33,249,207,0.6)";
            var property = document.getElementById("properties");
            property.style.right = "0px";
            document.getElementById('workspace').addEventListener("click",this.windowclick,true);
        }
    }
    
    render() {
        return (
            <div id = "workspace" onMouseMove = {(e)=>this.mouseover(e)} onDrop={(e)=>this.drop(e)} onDragOver={(e)=>this.dragOver(e)} className="work-space">
                
            </div>
        );
    }
}

export default Workspace;