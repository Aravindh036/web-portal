import React, { Component } from 'react'

import './SideBar.modules.css';
export default class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="side-bar--heading">
            <span>Resources Type</span>
        </div>
        <div className="items">
            <div  id="private-subnet" draggable="true">Private Subnet</div>
            <div  id="public-subnet" draggable="true">Public Subnet</div>
            <div  id="load-balancer" draggable="true">Load Balancer</div>

            <div  id="security-group" draggable="true">Security Group</div>
            <div  id="instance" draggable="true">Instance</div>
            <div  id="database-server" draggable="true">Database Server</div>
        </div>
      </div>
    )
  }
}