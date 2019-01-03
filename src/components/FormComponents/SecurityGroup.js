import React, { Component } from 'react'
import './FormComponents.css';
export default class SecurityGroup extends Component {
  state={
    GroupName:"",
    GroupDescription:"",
    // VpcId:""
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
  // getVpcId = (e)=>{
  //   this.setState({
  //     VpcId:e.target.value
  //   });
  // }
  saveForm = () => {
    if ((this.state.GroupName !== "") && (this.state.GroupDescription !== "") && (this.state.VpcId !== "")) {
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
      document.getElementById("security-group-form-id").classList.toggle("hide");
      document.getElementById("groupname-id").value = "";
      document.getElementById("group-description-id").value = "";
      // document.getElementById("vpc-id").value = "";
    }
  }
  render() {
    const id = this.props.currentComponent();
    console.log("id",id);
    return (
      <div className="ec2-form hide" id="security-group-form-id">
        <div className="form-elements">
            <input type="text" placeholder="GroupName" id="groupname-id" onBlur={this.getGroupName} />
            <input type="text"placeholder="GroupDescription" id="group-description-id" onBlur={this.getGroupDescription} />
            {/* <input type="text" placeholder="VpcId" id="vpc-id" onBlur={this.getVpcId} /> */}
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
