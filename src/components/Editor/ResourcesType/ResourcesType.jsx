import React, { Component } from 'react';

import './ResourcesType.css';
class ResourcesType extends Component {
    render() {
        return (
            <div className="resource-container" >
                <div className="resource-items">Auto Scaling</div>
                <div className="resource-items">Auto Scaling Batch</div>
                <div className="resource-items">EC2</div>
                <div className="resource-items">Subnet</div>
                <div className="resource-items">Security Group</div>
                <div className="resource-items">Load Balancer</div>
                <div className="resource-items">Cloud9</div>
                <div className="resource-items">Cloud Front</div>
                <div className="resource-items">S3</div>
            </div>
        );
    }
}

export default ResourcesType;