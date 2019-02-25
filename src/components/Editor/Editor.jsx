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


class Editor extends Component {
    state = {
        workflow: true,
        code: false
    }
    changeImage=()=>{

    }
    workflowPressed = (e) => {
        if(this.state.workflow!==true){
            this.setState({
                workflow:true,
                code:false
            });
            document.getElementById('under-line-id').classList.toggle('move-right');
        }
    }
    codePressed = (e) => {
        if(this.state.code!==true){
            this.setState({
                workflow:false,
                code:true
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
                    {this.state.workflow === true ? <Workspace/> : null}
                    {this.state.code === true ? <div className="code-space">Code</div> : null}
                </div>
                <div id = "properties" className="properties">
                    <label className="properties-title">
                        Properties
                    </label>

                </div>
            </div>
        );
    }
}

export default Editor;