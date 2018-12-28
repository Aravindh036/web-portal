import React, { Component } from 'react'
import './FormComponents.css';
export default class PublicSubnet extends Component {
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    return (
      <div className="ec2-form hide" id="public-subnet-form-id">
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
