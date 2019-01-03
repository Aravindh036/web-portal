import React, { Component } from 'react'
import './FormComponents.css';
export default class Subnet extends Component {
  state={
    name:"",
    CidrBlock:"",
    SubnetType:false,
    VpcId:""
  }
  getCidrBlock=(e)=>{
    this.setState({
      CidrBlock:e.target.value
    });
  }
  getSubnetType=(e)=>{
    this.setState({
      SubnetType:e.target.value
    });
  }
  getVpcId=(e)=>{
    this.setState({
      VpcId:e.target.value
    });
  }
  getName=(e)=>{
    this.setState({
      name:e.target.value
    });
  }
  saveForm = () => {
    console.log("hello");
    if ((this.state.CidrBlock !== "") && (this.state.VpcId !== "")) {
      console.log(this.state);
      var store = this.props.store();
      var selectedID = this.props.getSelected();
      for (var i = 0; i <= store.length - 1; i++) {
        if (store[i].id === selectedID) {
          console.log("hhhh");
          store[i].properties = this.state
        }
      }
      console.log("inside the save button", store);
      this.props.saveMyStore(store);
      document.getElementById("private-subnet-form-id").classList.toggle("hide");
      document.getElementById("cidr-block-id").value = "";
      document.getElementById("subnet-vpc-id").value = "";
      document.getElementById("subnet-name-id").value = "";
    }
  }
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    return (
      <div className="ec2-form hide" id="private-subnet-form-id">
        <div className="form-elements">
            <input type="text" placeholder="SubnetName" id="subnet-name-id" onBlur={this.getName} />
            <input onBlur={this.getCidrBlock} type="text" placeholder="CidrBlock" id="cidr-block-id"/>
            <select onChange={this.getSubnetType} name="SubnetType" id="subnet-type-id">
              <option value="false">Public</option>
              <option value="true">Private</option>
            </select>
            <input onBlur={this.getVpcId} type="text" placeholder="VpcId" id="subnet-vpc-id"/>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
