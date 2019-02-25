import React, { Component } from 'react';

import './FormComponents.css';


export default class SecurityGroup extends Component {
  state={
    GroupName:"",
    GroupDescription:"",
    Port:"",
    x:0,
    y:0
    // VpcId:""
  }
  constructor(props){
    super(props);
    this.state.x = this.props.x;
    this.state.y = this.props.y;
  }
  getGroupName = (e)=>{
    this.setState({
      GroupName:e.target.value
    });
  }
  getGroupDescription = (e)=>{
    this.setState({
      GroupDescription:e.target.value
    });
  }
  getPort=(e)=>{
    this.setState({
      Port:e.target.value
    });
  }
  // getVpcId = (e)=>{
  //   this.setState({
  //     VpcId:e.target.value
  //   });
  // }
  saveForm = () => {
    if ((this.state.GroupName !== "") && (this.state.GroupDescription !== "") ) {
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
      this.props.saveStore(store);
      document.getElementById("groupname-id").value = "";
      document.getElementById("group-description-id").value = "";
      document.getElementById("port-id").value = "";
      document.getElementById('properties').style.right = "-314px"; 
    }
  }
  render() {
    // const id = this.props.currentComponent();
    // console.log("id",id);
    return (
      <div className="ec2-form " id="security-group-form-id">
        <div className="form-elements">
            <input type="text" placeholder="GroupName" id="groupname-id" onBlur={this.getGroupName} />
            <input type="text"placeholder="GroupDescription" id="group-description-id" onBlur={this.getGroupDescription} />
            {/* <input type="text" placeholder="VpcId" id="vpc-id" onBlur={this.getVpcId} /> */}
            <input type="text" placeholder="Port(s)" id="port-id" onBlur={this.getPort}/>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
