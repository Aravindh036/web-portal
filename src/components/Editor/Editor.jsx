import React, { Component } from 'react';

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
import CloudWatch from './resources/FormComponents/CloudWatch';
import DBSubnet from './resources/FormComponents/DBSubnet';
import DatabaseServer from './resources/FormComponents/DatabaseServer';
import LoadBalancer from './resources/FormComponents/LoadBalancer';
import SecurityGroup from './resources/FormComponents/SecurityGroup';
import Subnet from './resources/FormComponents/Subnet';
import Properties from './resources/Properties/Properties';

var count=[];
class Editor extends Component {
    static properties = "null";
    state = {
        workflow: true,
        code: false,
        instance:()=>{
            return <EC2 saveStore={this.saveStore} />
        },
        cwatch:()=>{
            return <CloudWatch saveStore={this.saveStore} />
        },
        dbsubnet:()=>{
            return <DBSubnet saveStore={this.saveStore} />
        },
        dbinstance:()=>{
            return <DatabaseServer saveStore={this.saveStore} />
        },
        lbalancer:()=>{
            return <LoadBalancer saveStore={this.saveStore} />
        },
        sg:()=>{
            return <SecurityGroup saveStore={this.saveStore} />
        },
        subnet:()=>{
            return <Subnet saveStore={this.saveStore} />
        },
    }
    saveStore=()=>{
        
    }
    changeImage = () => {

    }
    updateStore=(title,id)=>{
        console.log(title);
        count.push({
            id:id,
            serviceName:title,
            properties:{

            }
        })
        console.log(count);
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
    changeProperty = (resource) =>{
        Editor.properties = this.state[resource]();
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
    render() {
        return (
            <div className="editor-container">
                <div className="sidebar">
                    <div className="image-container">
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
                        <div className="buttons-container">
                            <button className="save" ><img src={save} alt="⬆️" /> </button>
                            <button className="upload"> <img src={upload} alt="⬆️" /> </button>
                            <button className="download"> <img src={download} alt="⬇️" /> </button>
                            <button className="deploy" onMouseOver={this.changeImage} > <img alt="🚀" /> Deploy</button>
                        </div>
                    </nav>
                    {this.state.workflow === true ? <Workspace updateStore={this.updateStore} changeProperty={this.changeProperty} /> : null}
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