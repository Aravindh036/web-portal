import React, { Component } from 'react'
import './FormComponents.css';
export default class PrivateSubnet extends Component {
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    return (
      <div className="ec2-form hide" id="private-subnet-form-id">
        <div className="form-elements">
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
        </div>
        <button>button</button>
      </div>
    )
  }
}
