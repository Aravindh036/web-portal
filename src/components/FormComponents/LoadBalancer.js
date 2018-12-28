import React, { Component } from 'react'
import './FormComponents.css';
export default class LoadBalancer extends Component {
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    if(id==="load-balancer-form-id"){
      var store = this.props.store(),selected;
      console.log(store);
      for (var i = 0; i <= store.length - 1; i++) {
        if (store[i].serviceName === "load-balancer") {
          console.log("hhhh");
          selected = store[i];
        }
        console.log(selected);
      }
    }
    return (
      <div className="ec2-form hide" id="load-balancer-form-id">
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
