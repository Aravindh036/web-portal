import React, { Component } from 'react';

import './FormComponents.css';


export default class EC2 extends Component {
  state = {
    name: "",
    AvailabilityZone: "",
    KeyName: "",
    InstanceType:"t2.nano",
    ImageID:"ami-041114ddee4a98333",
    SubnetName:"",
    SecurityGroup:"",
    Backup:false,
    EventLog:false,
  }
  componentDidMount(){
    document.getElementById('drop-head-id').addEventListener('click',()=>{
      document.getElementById('drop-id').classList.toggle('hide');
      console.log("hhhh");
    }) ;
    
    document.getElementById('drop-id').addEventListener('click',(e)=>{
      document.getElementById("drop-id").classList.toggle('hide');
      console.log(e.target.innerHTML);
      document.getElementById('drop-head-id').innerHTML = e.target.innerHTML;
      this.setState({
        InstanceType:e.target.innerHTML
      });
    })  
    document.getElementById('drop-head-image').addEventListener('click',()=>{
      document.getElementById('drop-image').classList.toggle('hide');
      console.log("hhhh");
    }) ;
    
    document.getElementById('drop-image').addEventListener('click',(e)=>{
      document.getElementById("drop-image").classList.toggle('hide');
      console.log(e.target.innerHTML);
      document.getElementById('drop-head-image').innerHTML = e.target.innerHTML;
      this.setState({
        ImageID:e.target.innerHTML
      });
    })
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
  getSubnetName = (e) => {
    this.setState({
      SubnetName: e.target.value
    });
  }
  getSecurityGroup = (e) => {
    this.setState({
      SecurityGroup: e.target.value
    });
  }
  getBackup=(e)=>{
    this.setState({
      Backup: ! this.state.Backup
    });
    console.log(this.state.Backup);
  }
  getEventLog=(e)=>{
    this.setState({
      EventLog:!this.state.EventLog
    });
  }
  saveForm = () => {
    if ((this.state.name !== "") && (this.state.AvailabilityZone !== "") && (this.state.KeyName !== "")) {
      console.log(this.state);
      // var store = this.props.store();
      // var selectedID = this.props.getSelected();
      // for (var i = 0; i <= store.length - 1; i++) {
      //   if (store[i].id === selectedID) {
      //     console.log("hhhh");
      //     store[i].properties = this.state
      //   }
      // }
      // console.log("inside the save button", store);
      // this.props.saveMyStore(store);
      document.getElementById("ec2-name-id").value = "";
      document.getElementById("keyname-id").value = "";
      document.getElementById("availability-id").value = ""; 
      document.getElementById("ec2-subnet-id").value = "";
      document.getElementById("security-groups-id").value = ""; 
    }
  }
  render() {
    // if(store.properties===undefined){
      return (
        <div className="ec2-form" id="ec2-form-id">
          <div className="form-elements">
            <input id="ec2-name-id" type="text" placeholder="Name" onBlur={this.getName}  />
            <input id="availability-id" type="text" placeholder="AvailabilityZone" onBlur={this.getAvailabilityZone} />
            <input id="keyname-id" type="text" placeholder="KeyName" onBlur={this.getKeyName} />
            {/* <select onChange={this.getInstanceType} name="instanceType" id="instanceType-id">
              <option value="t2.nano">t2.nano</option>
              <option value="t2.micro">t2.micro</option>
              <option value="t2.small">t2.small</option>
              <option value="t2.medium">t2.medium</option>
              <option value="t2.large">t2.large</option>
            </select> */}
            <div className="drop-down-container">
              <div className="drop-head" id="drop-head-id">
                select one
              </div>
              <div className="drop-down hide" id="drop-id">
                <div className="drop-down-item">t2.nano</div>
                <div className="drop-down-item">t2.micro</div>
                <div className="drop-down-item">t2.small</div>
                <div className="drop-down-item">t2.medium</div>
                <div className="drop-down-item">t2.large</div>
              </div>
            </div>
            {/* <select onChange={this.getImageID} name="imageID" id="imageID-id">
              <option value="ami-0df43b4f8a07c7c14">Windows</option>
              <option value="ami-0f9cf087c1f27d9b1 ">Linux</option>
            </select> */}
            <div className="drop-down-container">
              <div className="drop-head" id="drop-head-image">
                select one
              </div>
              <div className="drop-down hide" id="drop-image">
                <div className="drop-down-item">Windows</div>
                <div className="drop-down-item">Linux</div>
              </div>
            </div>
            <div className="automatic-shutdown">
              <div className="conatiner">
                <label className="switch">
                  <input type="checkbox" id="checkbox" onChange={this.getBackup}/>
                  <span className="slider round"></span>
                </label>
              </div>
            <label>Automatic Shutdown</label>
            </div>
            <div className="event-log">
              <div className="conatiner">
                <label className="switch">
                  <input type="checkbox" id="checkbox" onChange={this.getEventLog} />
                  <span className="slider round"></span>
                </label>
              </div>
              <label>Event Log</label>
            </div>
            <input type="text" placeholder="SubnetName" id="ec2-subnet-id" onBlur={this.getSubnetName}/>
            <input type="text" placeholder="SecurityGroups" id="security-groups-id" onBlur={this.getSecurityGroup} />
          </div>
          <button onClick={this.saveForm}>Save</button>
        </div>
      )
  }
}
