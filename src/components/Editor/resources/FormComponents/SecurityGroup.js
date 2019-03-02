import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png';

import './FormComponents.css';


export default class SecurityGroup extends Component {
  state={
    GroupName:"",
    VpcId:"",
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

  componentDidMount(){
    var store = this.props.store();
    var selectedID = this.props.getSelected();
    if(Object.keys(store[selectedID].properties).length !== 0){
        this.setState({...store[selectedID].properties},()=>{
            document.getElementById("groupname-id").value = this.state.GroupName;
            document.getElementById("group-description-id").value = this.state.GroupDescription;
            document.getElementById("port-id").value = this.state.Port; 
        })
    }
    document.getElementById('drop-head-vpc').addEventListener('click', () => {
      document.getElementById('drop-vpc').classList.toggle('hide');
      // console.log("hhhh");
    });

    document.getElementById('drop-vpc').addEventListener('click', (e) => {
      document.getElementById("drop-vpc").classList.toggle('hide');
      // console.log(e.target.innerHTML);
      if (!e.target.innerHTML.includes("No vpcs created")) {
        document.getElementById('drop-head-vpc').innerHTML = e.target.innerHTML;
        this.setState({
          VpcId: e.target.id
        });
      }
    })
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
    if(this.state.GroupName===""){
      alert("Give a name for the SecurityGroup");
    }
    else if(this.state.GroupDescription===""){
      alert("Give a description for the group");
    }
    
    if ((this.state.GroupName !== "") && (this.state.GroupDescription !== "") ) {
      console.log(this.state);
      var store = this.props.store();
      var selectedID = this.props.getSelected();
      // for (var i = 0; i <= store.length - 1; i++) {
      //   if (store[i].id === selectedID) {
      //     console.log("hhhh");
      //     store[i].properties = this.state
      //   }
      // }
      store[selectedID].properties = this.state;
      console.log("inside the save button", store);
      this.props.saveStore(store);
      this.props.remove();
      document.getElementById('properties').style.right = "-314px"; 
    }
  }
  render() {
    var subnet = this.props.getVpc();
    var subnetDropdown = "";
    console.log(subnet,"hiiiiiiii",subnet);
    if (Object.values(subnet).length !== 0) {
      subnetDropdown = Object.values(subnet).map(sub => {
        return <div id={sub.id} className="drop-down-item">{sub.properties.name}</div>
      })
    }
    else {
      subnet = [1];
      subnetDropdown = subnet.map(empty => {
        return <div className="drop-down-item">No VPC(s) created</div>
      })
    }
    return (
      <div className="ec2-form " id="security-group-form-id">
        <div className="form-elements">
            <input type="text" placeholder="GroupName" id="groupname-id" onBlur={this.getGroupName} />
            <input type="text"placeholder="GroupDescription" id="group-description-id" onBlur={this.getGroupDescription} />
            {/* <input type="text" placeholder="VpcId" id="vpc-id" onBlur={this.getVpcId} /> */}
            <input type="text" placeholder="Port(s)" id="port-id" onBlur={this.getPort}/>
            <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-vpc">
                Select a VPC
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-vpc">
              {/* <div className="drop-down-item">Amazon Linux 2 AMI</div> */}
              {subnetDropdown}
            </div>
          </div>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
