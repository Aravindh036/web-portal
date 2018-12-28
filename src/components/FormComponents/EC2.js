import React, { Component } from 'react'
import './FormComponents.css';
export default class EC2 extends Component {
  state = {
    name: "",
    AvailabilityZone: "",
    KeyName: "",
  }
  getName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  getKeyName = (e) => {
    this.setState({
      KeyName: e.target.value
    });
  }
  getAvailabilityZone = (e) => {
    this.setState({
      AvailabilityZone: e.target.value
    });
  }
  saveForm = () => {
    if ((this.state.name !== "") && (this.state.AvailabilityZone !== "") && (this.state.KeyName !== "")) {
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
      document.getElementById("ec2-form-id").classList.toggle("hide");
      document.getElementById("ec2-name-id").value = "";
      document.getElementById("keyname-id").value = "";
      document.getElementById("availability-id").value = "";
    }
  }
  render() {
    const id = this.props.currentComponent();
    console.log("id", id);
    if (id === null) {
      return <div></div>;
    }
    if (id === "ec2-form-id") {
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
      <div className="ec2-form hide" id="ec2-form-id">
        <div className="form-elements">
          <input id="ec2-name-id" type="text" placeholder="Name" onBlur={this.getName} value={selected.properties.name} />
          <input id="availability-id" type="text" placeholder="AvailabilityZone" onBlur={this.getAvailabilityZone} value={selected.properties.AvailabilityZone } />
          <input id="keyname-id" type="text" placeholder="KeyName" onBlur={this.getKeyName} value={selected.properties.KeyName} />
          <select name="instanceType" id="instanceType-id">
            <option value="t2.nano">t2.nano</option>
            <option value="t2.micro">t2.micro</option>
            <option value="t2.small">t2.small</option>
            <option value="t2.medium">t2.medium</option>
            <option value="t2.large">t2.large</option>
          </select>
          <select name="imageID" id="imageID-id">
            <option value="ami-041114ddee4a98333">Windows</option>
            <option value="ami-009d6802948d06e52">Linux</option>
          </select>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
