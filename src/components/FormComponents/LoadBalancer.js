import React, { Component } from 'react'
import './FormComponents.css';
export default class LoadBalancer extends Component {
  state={
    InstancePort:"",
    LoadBalancerPort:"",
    PolicyNames:"",
    Protocol:""
  }
  getInstancePort=(e)=>{
    this.setState({
      InstancePort: e.target.value
    })
  }
  getLoadBalancerPort=(e)=>{
    this.setState({
      LoadBalancerPort: e.target.value
    })
  }
  getPolicyNames=(e)=>{
    this.setState({
      PolicyNames: e.target.value
    })
  }
  getProtocol=(e)=>{
    this.setState({
      Protocol: e.target.value
    })
  }
  saveForm = () => {
    console.log("gegege",this.state);
    if ((this.state.InstancePort!== "") && (this.state.LoadBalancerPort !== "") && (this.state.Protocol !== "")) {
      console.log(this.state);
      var store = this.props.store();
      var selectedID = this.props.getSelected();
      for (var i = 0; i <= store.length - 1; i++) {
        if (store[i].id === selectedID) {
          console.log("hhhh");
          store[i].properties = this.state;
        }
      }
      console.log("inside the save button", store);
      this.props.saveMyStore(store);
      document.getElementById("load-balancer-form-id").classList.toggle("hide");
      document.getElementById("instance-port-id").value = "";
      document.getElementById("loadbalancer-port-id").value = "";
      document.getElementById("policyname-id").value = "";
      document.getElementById("protocol-id").value = "";
    }
  }
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    if ((id === null) || (id!=="load-balancer-form-id")) {
      return <div></div>;
    }
    if(id==="load-balancer-form-id"){
      var store = this.props.store(), selected;
      var selectedID = this.props.getSelected();
      console.log(store);
      for (var i = 0; i <= store.length - 1; i++) {
        if (store[i].id === selectedID) {
          console.log("hhhh");
          selected = store[i];
        }
        console.log("selected", selected);
      }
    }
    return (
      <div className="ec2-form hide" id="load-balancer-form-id">
        <div className="form-elements">
            <input id="instance-port-id" type="text" placeholder="InstancePort" onBlur={this.getInstancePort} />
            <input id="loadbalancer-port-id" type="text" placeholder="LoadBalancerPort" onBlur={this.getLoadBalancerPort} />
            <input id="policyname-id" type="text" placeholder="PolicyNames" onBlur={this.getPolicyNames} />
            <input id="protocol-id" type="text" placeholder="Protocol" onBlur={this.getProtocol} />
        </div>
        <button onClick={this.saveForm}>button</button>
      </div>
    )
  }
}
