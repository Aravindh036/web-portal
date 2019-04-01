import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';

export default class Subnet extends Component {
  state = {
    name: "",
    CidrBlock: "",
    SubnetType: "Public",
    VpcId:"",
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
        document.getElementById("drop-head-id").innerHTML = this.state.SubnetType;
      })
    }
    document.getElementById('drop-head-id').addEventListener('click', () => {
      document.getElementById('drop-id').classList.toggle('hide');
    });

    document.getElementById('drop-id').addEventListener('click', (e) => {
      document.getElementById("drop-id").classList.toggle('hide');
      document.getElementById('drop-head-id').innerHTML = e.target.innerHTML;
      this.setState({
        SubnetType: e.target.innerHTML
      });
    })
    document.getElementById('drop-head-vpc').addEventListener('click', () => {
      document.getElementById('drop-vpc').classList.toggle('hide');
    });

    document.getElementById('drop-vpc').addEventListener('click', (e) => {
      document.getElementById("drop-vpc").classList.toggle('hide');
      if (!e.target.innerHTML.includes("No vpcs created")) {
        document.getElementById('drop-head-vpc').innerHTML = e.target.innerHTML;
        this.setState({
          VpcId: e.target.id
        });
      }
    })
  }
  getCidrBlock = (e) => {
    this.setState({
      CidrBlock: e.target.value
    });
  }
  getSubnetType = (e) => {
    this.setState({
      SubnetType: e.target.value
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
  saveForm = () => {
    if (this.state.name === "") {
      alert("Give a name for the Subnet!!!");
    }
    else if (this.state.CidrBlock === "") {
      alert("Specify the Cidr address");
    }
    if ((this.state.CidrBlock !== "")) {
      var store = this.props.store();
      var subnet = this.props.getSubnet();
      var selectedID = this.props.getSelected();
      // for (var i = 0; i <= store.length - 1; i++) {
      //   if (store[i].id === selectedID) {
      //     store[i].properties = this.state
      //   }
      // }
      store[selectedID].properties = this.state;
      subnet[selectedID].properties = this.state;
      this.props.saveStore(store);
      this.props.remove();
      document.getElementById('properties').style.right = "-314px";
    }
  }
  render() {
    var subnet = this.props.getVpc();
    var subnetDropdown = "";
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
      <div className="ec2-form " id="private-subnet-form-id">
        <div className="form-elements">
          <input type="text" placeholder="SubnetName" id="subnet-name-id" onBlur={this.getName} />
          <input onBlur={this.getCidrBlock} type="text" placeholder="CidrBlock" id="cidr-block-id" />
          {/* <select onChange={this.getSubnetType} name="SubnetType" id="subnet-type-id">
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select> */}
          <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-id">
                Public
            </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-id">
              <div className="drop-down-item">Public</div>
              <div className="drop-down-item">Private</div>
            </div>
          </div>
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
          {/* <input onBlur={this.getVpcId} type="text" placeholder="VpcId" id="subnet-vpc-id"/> */}
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
