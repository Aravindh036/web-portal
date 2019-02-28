import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';

export default class Vpc extends Component {
  state = {
    name: "",
    CidrBlock: "",
    InstanceTenancy: "default",
    DNS:false,
    getDNShost:false,
    // VpcId:"",
    x: 0,
    y: 0
  }
  constructor(props) {
    super(props);
    this.state.x = this.props.x;
    this.state.y = this.props.y;
  }
  componentDidMount() {
    var store = this.props.store();
    var selectedID = this.props.getSelected();
    if (Object.keys(store[selectedID].properties).length !== 0) {
      this.setState({ ...store[selectedID].properties }, () => {
        document.getElementById("subnet-name-id").value = this.state.name;
        document.getElementById("cidr-block-id").value = this.state.CidrBlock;
        document.getElementById("drop-head-id").innerHTML = this.state.InstanceTenancy;
      })
    }
    document.getElementById('drop-head-id').addEventListener('click', () => {
      document.getElementById('drop-id').classList.toggle('hide');
      // console.log("hhhh");
    });

    document.getElementById('drop-id').addEventListener('click', (e) => {
      document.getElementById("drop-id").classList.toggle('hide');
      // console.log(e.target.innerHTML);
      document.getElementById('drop-head-id').innerHTML = e.target.innerHTML;
      this.setState({
        InstanceTenancy: e.target.innerHTML
      });
    })
  }
  getCidrBlock = (e) => {
    this.setState({
      CidrBlock: e.target.value
    });
  }
  getInstanceTenancy = (e) => {
    this.setState({
      InstanceTenancy: e.target.value
    });
  }
  // getVpcId=(e)=>{
  //   this.setState({
  //     VpcId:e.target.value
  //   });
  // }
  getName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  getDNS = (e) => {
    this.setState({
      DNS: !this.state.DNS
    });
    // console.log(this.state.Backup);
  }
  getDNShost = (e) => {
    this.setState({
      DNShost: !this.state.DNShost
    });
    // console.log(this.state.Backup);
  }
  saveForm = () => {
    // console.log("hello");
    if (this.state.name === "") {
      alert("Give a name for the Subnet!!!");
    }
    else if (this.state.CidrBlock === "") {
      alert("Specify the Cidr address");
    }
    if ((this.state.CidrBlock !== "")) {
      console.log(this.state);
      var store = this.props.store();
      var vpc = this.props.getVpc();
      var selectedID = this.props.getSelected();
      // for (var i = 0; i <= store.length - 1; i++) {
      //   if (store[i].id === selectedID) {
      //     console.log("hhhh");
      //     store[i].properties = this.state
      //   }
      // }
      store[selectedID].properties = this.state;
      vpc[selectedID].properties = this.state;
      console.log("inside the save button", store);
      this.props.saveStore(store);
      this.props.remove();
      document.getElementById('properties').style.right = "-314px";
      console.log("vpc", vpc);
      console.log("count", store);
    }
  }
  render() {
    return (
      <div className="ec2-form " id="private-subnet-form-id">
        <div className="form-elements">
          <input type="text" placeholder="VPC Name" id="subnet-name-id" onBlur={this.getName} />
          <input onBlur={this.getCidrBlock} type="text" placeholder="CidrBlock" id="cidr-block-id" />
          <div className="automatic-shutdown">
            <div className="conatiner">
              <label className="switch">
                <input type="checkbox" id="checkbox" onChange={this.getDNS} />
                <span className="slider round"></span>
              </label>
            </div>
            <label>Enable DNS</label>
          </div>
          <div className="automatic-shutdown">
            <div className="conatiner">
              <label className="switch">
                <input type="checkbox" id="checkbox" onChange={this.getDNShost} />
                <span className="slider round"></span>
              </label>
            </div>
            <label>Enable DNS Host Names</label>
          </div>
          <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-id">
                Instance Tenancy
            </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-id">
              <div className="drop-down-item">default</div>
              <div className="drop-down-item">dedicated</div>
            </div>
          </div>
          {/* <input onBlur={this.getVpcId} type="text" placeholder="VpcId" id="subnet-vpc-id"/> */}
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
