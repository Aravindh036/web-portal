import React, { Component } from 'react';
import html2canvas from 'html2canvas';

import logo from '../../assets/logo.png';
import setting from '../../assets/settings.png';
import code from '../../assets/code.png';
import upload from '../../assets/upload.png';
import download from '../../assets/download.png';
import save from '../../assets/save.png';
import user from '../../assets/user.png';

import ResourcesType from './ResourcesType/ResourcesType';

import './Editor.css';
import Workspace from './Workspace/Workspace';

import EC2 from './resources/FormComponents/EC2';
import Vpc from './resources/FormComponents/Vpc';
import CloudWatch from './resources/FormComponents/CloudWatch';
import DBSubnet from './resources/FormComponents/DBSubnet';
import DatabaseServer from './resources/FormComponents/DatabaseServer';
import LoadBalancer from './resources/FormComponents/LoadBalancer';
import SecurityGroup from './resources/FormComponents/SecurityGroup';
import Subnet from './resources/FormComponents/Subnet';
import Properties from './resources/Properties/Properties';
import deploy from '../YAMLParser';

var count = {}, current_element_id = null, yaml = "Deploy for yaml", subnet = {}, security = {}, vpc = {}, dbSubnet={},instance={}, log = 0, log_array=[];
class Editor extends Component {
    static properties = null;
    state = {
        workflow: true,
        code: false,
        instance: (x, y) => {
            // console.log("hello");
            return <EC2 x={x} y={y} incLog = {this.incLog} decLog = {this.decLog} getSecurity={this.getSecurity} getSubnet={this.getSubnet} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        cwatch: (x, y) => {
            return <CloudWatch x={x} y={y} getInstance={this.getInstance} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        dbsubnet: (x, y) => {
            return <DBSubnet getSubnet={this.getSubnet} getDBsubnet={this.getDBsubnet} x={x} y={y} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        dbinstance: (x, y) => {
            return <DatabaseServer getDBsubnet={this.getDBsubnet} x={x} y={y} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        lbalancer: (x, y) => {
            return <LoadBalancer x={x} y={y} getSecurity={this.getSecurity} getSubnet={this.getSubnet} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        sg: (x, y) => {
            return <SecurityGroup x={x} y={y} getVpc={this.getVpc} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        subnet: (x, y) => {
            return <Subnet getVpc={this.getVpc} getSubnet={this.getSubnet} x={x} y={y} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
        vpc: (x, y) => {
            return <Vpc getVpc={this.getVpc} x={x} y={y} saveStore={this.saveStore} store={this.store} getSelected={this.getSelected} remove={this.removeproperties} />
        },
    }


    componentDidMount(){
        this.json = JSON.parse(sessionStorage.getItem('json'));
        // console.log(this.json,"hi");
        this.email = sessionStorage.getItem('email');
        this.title = sessionStorage.getItem('title');
        console.log(this.json);
        if(!this.email || !this.title){
            document.location = "/";
        }
        if (this.json !== null) {
            count = this.json;
        }
    }
    incLog = (id)=>{
        log++;
        id.replace(/-\.@\^/g,"_")
        log_array.push(id)
    }
    decLog = (id)=>{
        id.replace(/-\.@\^/g,"_")
        if(log>0){
            log--;
            log_array = log_array.filter((elem,index,arr)=>{
                if(elem === id){
                    return false;
                }
                return true;
            })
        }
    }
    getSubnet = () => {
        return subnet;
    }

    getVpc = () => {
        return vpc;
    }

    getSecurity=()=>{
        return security;
    }
    getDBsubnet=()=>{
        return dbSubnet;
    }
    getInstance=()=>{
        return instance;
    }
    deploy = () => {
        if (Object.keys(count).length === 0) {
            alert('no service to build');
            return;
        }
        yaml = deploy(count,this.email);
        // console.log(yaml);
        console.log(log);
        var log_flag = false
        if(log>0){
            log_flag = true;
        }
        fetch('http://localhost:2019/deploy', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                yaml: yaml,
                email:this.email ,
                title:this.title,
                log:log_flag,
                log_array:log_array
            })
        })
    }
    removeproperties = () => {
        Editor.properties = null;
        // console.log("remove",count);
        this.forceUpdate()
    }
    saveStore = (store) => {
        // count = store;
    }
    store = () => {
        return count;
    }
    changeImage = () => {

    }
    currentID = (id) => {
        current_element_id = id;
    }
    getSelected = () => {
        return current_element_id;
    }
    updateStore = (title, id, x, y) => {
        // console.log(title);
        // count.push({
        //     id:id,
        //     serviceName:title,
        //     properties:{

        //     }
        // })
        if (title === "subnet") {
            subnet[id] = {
                id: id,
                properties: {
                    name: `subnet-${Object.keys(subnet).length + 1}`
                }
            }
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    name: `subnet-${Object.keys(subnet).length}`,
                    x: x,
                    y: y
                }
            }
        }
        else if (title === "sg") {
            security[id] = {
                id: id,
                properties: {
                    GroupName: `security-${Object.keys(security).length + 1}`
                }
            }
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    GroupName: `security-${Object.keys(security).length}`,
                    x: x,
                    y: y
                }
            }
        }
        else if(title==="dbsubnet"){
            dbSubnet[id] = {
                id: id,
                properties: {
                    name: `dbSubnet-${Object.keys(dbSubnet).length + 1}`
                }
            }
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    name: `dbSubnet-${Object.keys(dbSubnet).length}`,
                    x: x,
                    y: y
                }
            }
        }
        else if (title === "vpc") {
            vpc[id] = {
                id: id,
                properties: {
                    name: `vpc-${Object.keys(vpc).length + 1}`
                }
            }
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    name: `vpc-${Object.keys(vpc).length}`,
                    x: x,
                    y: y
                }
            }
        }
        else if (title === "instance") {
            instance[id] = {
                id: id,
                properties: {
                    name: `instance-${Object.keys(instance).length + 1}`
                }
            }
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    name: `instance-${Object.keys(instance).length}`,
                    x: x,
                    y: y
                }
            }
        }
        else {
            count[id] = {
                id: id,
                serviceName: title,
                properties: {
                    x: x,
                    y: y
                }
            }
        }
        // console.log(count);
    }
    workflowPressed = (e) => {
        if (this.state.workflow !== true) {
            this.setState({
                workflow: true,
                code: false
            });
            document.getElementById('under-line-id').classList.toggle('move-right');
        }
    }
    changeProperty = (resource, x, y) => {
        Editor.properties = this.state[resource](x, y);
        this.forceUpdate();
    }
    codePressed = (e) => {
        if (this.state.code !== true) {
            this.setState({
                workflow: false,
                code: true
            });
            document.getElementById('under-line-id').classList.toggle('move-right');
        }
    }

    update_position = (id, x, y) => {
        // console.log("before",count);
        count[id].properties.x = x;
        count[id].properties.y = y;
        // console.log("after",count);

    }

    cloud_save = ()=>{
        var that = this;
        html2canvas(document.getElementById('workspace'))
        .then(function(canvas) {
            fetch('http://localhost:2019/save',{
                method:"POST",
                body:JSON.stringify({
                    "json":JSON.stringify(count),
                    "name":that.title,
                    "email":that.email,
                    "svg":canvas.toDataURL('image/png')
                }),
                headers:{"Content-Type":"application/json"}
            })
            .then(res=>{
                if(res.status === 200){
                    alert("save successful");
                    sessionStorage.setItem('json',JSON.stringify(count))
                }
                else{
                    alert("try again later");
                }
            })
            .catch(err=>{
                console.log(err.message);
            })
        });
    }

    log = ()=>{
        document.location = '/dashboard'
    }

    download = () => {
        if (Object.keys(count).length === 0) {
            alert('no service to build');
            return;
        }
        var element = document.createElement('a');
        yaml = deploy(count,this.email);
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(yaml));
        element.setAttribute('download', "template.yaml");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    render() {
        return (
            <div className="editor-container">
                <div className="sidebar">
                    <div onClick={this.log} className="image-container">
                        <img src={logo} alt="su" />
                        <div className="name">
                            <span>su </span>
                            <span>PILVI</span>
                        </div>
                    </div>
                    <div className="resource-types">
                        <div className="resource-heading">
                            Resource Type
                        </div>
                        <ResourcesType />
                    </div>
                </div>
                <div className="main-container">
                    <nav className="nav-container">
                        <div className="workflow-code">
                            <div className="workflow" onClick={this.workflowPressed}>
                                <img src={setting} alt="flow" />
                                <span>Workflow</span>
                            </div>
                            <div className="code" onClick={this.codePressed}>
                                <img src={code} alt="C" />
                                <span>Code</span>
                            </div>
                            <div id="under-line-id" className="under-line"></div>
                        </div>
                        <label contentEditable={true} className="arch-title">{sessionStorage.getItem("title")}</label>
                        <div className="buttons-container">
                            <button onClick={this.cloud_save} className="save" ><img src={save} alt="⬆️" /> </button>
                            <button className="upload"> <img src={upload} alt="⬆️" /> </button>
                            <button className="download" onClick={this.download} > <img src={download} alt="⬇️" /> </button>
                            <button className="deploy" onClick={this.deploy} onMouseOver={this.changeImage} > <img alt="🚀" /> Deploy</button>
                        </div>
                    </nav>
                    {this.state.workflow === true ? <Workspace remove={this.removeproperties} update_position={this.update_position} updateStore={this.updateStore} changeProperty={this.changeProperty} currentID={this.currentID} /> : null}
                    {this.state.code === true ? <div className="code-space">Code</div> : null}
                </div>
                {/* <div id="properties" className="properties">
                    <div className="properties-container">
                        <div className="properties-title">
                            Properties
                        </div>
                        {Editor.properties}
                    </div>
                </div> */}
                <Properties properties={Editor.properties} />
            </div>
        );
    }
}

export default Editor;