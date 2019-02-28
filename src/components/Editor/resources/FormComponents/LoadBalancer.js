import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';


export default class LoadBalancer extends Component {
  state={
    InstancePort:"",
    LoadBalancerPort:"",
    PolicyNames:"",
    Protocol:"",
    LoadBalancerName:"",
    SecurityGroup:"",
    Subnet:"",
    x:0,
    y:0
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
            document.getElementById("loadbalancer-name-id").value = this.state.LoadBalancerName;
            document.getElementById("instance-port-id").value = this.state.InstancePort;
            document.getElementById("loadbalancer-port-id").value = this.state.LoadBalancerPort; 
            document.getElementById("policyname-id").value = this.state.PolicyNames;
            document.getElementById("protocol-id").value = this.state.Protocol;
            document.getElementById("security-group-id").value = this.state.SecurityGroup; 
            // document.getElementById("subnet-name-id").value = this.state.Subnet; 
        })
    }
    document.getElementById('drop-head-subnet').addEventListener('click', () => {
      document.getElementById('drop-subnet').classList.toggle('hide');
      // console.log("hhhh");
    });

    document.getElementById('drop-subnet').addEventListener('click', (e) => {
      document.getElementById("drop-subnet").classList.toggle('hide');
      // console.log(e.target.innerHTML);
      if (!e.target.innerHTML.includes("No subnets created")) {
        document.getElementById('drop-head-subnet').innerHTML = e.target.innerHTML;
        this.setState({
          Subnet: e.target.innerHTML
        });
      }
    })
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
  getLoadBalancerName=(e)=>{
    this.setState({
      LoadBalancerName: e.target.value
    })
  }
  getSecurityGroup=(e)=>{
    this.setState({
      SecurityGroup: e.target.value
    })
  }
  getSubnetName=(e)=>{
    this.setState({
      Subnet: e.target.value
    })
  }
  
  saveForm = () => {
    if(this.state.LoadBalancerName===""){
      alert("Give a name for the Loadbalancer!!");
      return;
    }
    else if (this.state.InstancePort===""){
      alert("Mention the instance port");
      return;

    }
    else if (this.state.LoadBalancerPort===""){
      alert("Mention the loadbalancer port");
      return;

    }
    else if(this.state.Protocol===""){
      alert("Mention the protocol");
      return;

    }
    // console.log("gegege",this.state);
    if ((this.state.InstancePort!== "") && (this.state.LoadBalancerPort !== "") && (this.state.Protocol !== "")) {
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
    var subnet = this.props.getSubnet();
    var subnetDropdown = "",i;
    if (subnet.length !== 0) {
      subnetDropdown = Object.values(subnet).map(sub => {
        return <div className="drop-down-item">{sub.properties.name}</div>
      })
    }
    else {
      subnet = [1];
      subnetDropdown = subnet.map(empty => {
        return <div className="drop-down-item">No subnets created</div>
      })
    }
    return (
      <div className="ec2-form " id="load-balancer-form-id">
        <div className="form-elements">
            <input id="loadbalancer-name-id" type="text" placeholder="LoadBalancerName" onBlur={this.getLoadBalancerName} />
            <input id="instance-port-id" type="text" placeholder="InstancePort" onBlur={this.getInstancePort} />
            <input id="loadbalancer-port-id" type="text" placeholder="LoadBalancerPort" onBlur={this.getLoadBalancerPort} />
            <input id="policyname-id" type="text" placeholder="PolicyNames" onBlur={this.getPolicyNames} />
            <input id="protocol-id" type="text" placeholder="Protocol" onBlur={this.getProtocol} />
            <input id="security-group-id" type="text" placeholder="SecurityGroups" onBlur={this.getSecurityGroup}/>
            {/* <input id="subnet-name-id" type="text" placeholder="SubnetName" onBlur={this.getSubnetName}/> */}
            <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-subnet">
                Select a Subnet
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-subnet">
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
