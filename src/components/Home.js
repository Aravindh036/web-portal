import React, { Component } from 'react'

import Parser from './Parser/Parser';
import './home.modules.css';
import SideBar from './SideBar/SideBar';
import EC2 from './FormComponents/EC2';
import LoadBalancer from './FormComponents/LoadBalancer';
import Subnet from './FormComponents/Subnet';
import SecurityGroup from './FormComponents/SecurityGroup';
import DatabaseServer from './FormComponents/DatabaseServer';
import deploy from './YAMLParser';
var count = [];
var json = [
  {
    "id": "instance0.9239732844975672",
    "serviceName": "instance",
    "properties": {
      "name": "sample1",
      "AvailabilityZone": "us-east-1a",
      "KeyName": "dcode",
      "InstanceType": "t2.nano",
      "ImageID": "ami-041114ddee4a98333",
      "SubnetName": "subnet1",
      "SecurityGroup": "group2"
    }
  },
  {
    "id": "instance0.15729276945534254",
    "serviceName": "instance",
    "properties": {
      "name": "sample2",
      "AvailabilityZone": "us-east-1a",
      "KeyName": "dcode",
      "InstanceType": "t2.nano",
      "ImageID": "ami-041114ddee4a98333",
      "SubnetName": "subnet2",
      "SecurityGroup": "group3"
    }
  },
  {
    "id": "subnet0.7223799806676185",
    "serviceName": "subnet",
    "properties": {
      "name": "subnet1",
      "CidrBlock": "cdir-block1",
      "SubnetType": false,
      "VpcId": "id-1"
    }
  },
  {
    "id": "subnet0.9644905804909778",
    "serviceName": "subnet",
    "properties": {
      "name": "subnet2",
      "CidrBlock": "cdir-block-1",
      "SubnetType": false,
      "VpcId": "id-2"
    }
  },
  {
    "id": "load-balancer0.8569251994384368",
    "serviceName": "load-balancer",
    "properties": {
      "InstancePort": "insatnce-port-number",
      "LoadBalancerPort": "load-port",
      "PolicyNames": "policy names",
      "Protocol": "protocollllll",
      "LoadBalancerName": "loadbalancer1",
      "SecurityGroup": "group1",
      "Subnet": "subnet1"
    }
  },
  {
    "id": "security-group0.6587310457055509",
    "serviceName": "security-group",
    "properties": {
      "GroupName": "group2",
      "GroupDescription": "for security",
      "VpcId": "id-2"
    }
  },
  {
    "id": "security-group0.5102873972498547",
    "serviceName": "security-group",
    "properties": {
      "GroupName": "group1",
      "GroupDescription": "for security",
      "VpcId": "id-1"
    }
  },
  {
    "id": "database-server0.8422363985381494",
    "serviceName": "database-server",
    "properties": {
      "DBName": "SampleDB",
      "VPCSecurityGroups": "group4",
      "AllocatedStorage": "3",
      "DBInstanceClass": "db.t2.micro",
      "Engine": "sample-engine",
      "MasterUsername": "user",
      "MasterUserPassword": "password"
    }
  },
  {
    "id": "security-group0.6278792570854488",
    "serviceName": "security-group",
    "properties": {
      "GroupName": "group3",
      "GroupDescription": "for security purpose",
      "VpcId": "id-3"
    }
  },
  {
    "id": "security-group0.05555611527355597",
    "serviceName": "security-group",
    "properties": {
      "GroupName": "group4",
      "GroupDescription": "for data-base",
      "VpcId": "id-1"
    }
  }
];
export default class Home extends Component {
  state = {
    active: null,
    id: null,
    yaml:"Deploy to get the json"
  }
  deploy=()=>{
    var yaml = deploy(json);
    this.setState({
      yaml:yaml
    });
  }
  currentComponent = () => {
    return this.state.active;
  }
  getCount = () => {
    console.log("count number: ",count);
    return count;
  }
  getSelected = () => {
    return this.state.selected;
  }
  dismiss = () => {
    if (this.state.active != null) {
      document.getElementById(this.state.active).classList.toggle("hide");
    }
    console.log("heuhe", this.state.active);
  }
  selectElement = (e) => {
    this.setState({
      selected: e.target.id
    })
    console.log(e.target.id);
  }
  ec2 = (e) => {
    this.setState({
      active: "ec2-form-id",
      id: e.target.id,
    })
    document.getElementById("ec2-form-id").classList.toggle("hide");
    document.getElementById("ec2-name-id").value = "";
    document.getElementById("keyname-id").value = "";
    document.getElementById("availability-id").value = "";
    console.log("helllo from ec2");
  }
  Subnet = (e) => {
    console.log("helllo");
    this.setState({
      active: "private-subnet-form-id",
      id: e.target.id
    })
    document.getElementById("private-subnet-form-id").classList.toggle("hide");
  }
  LoadBalancer = (e) => {
    console.log("helllo");
    this.setState({
      active: "load-balancer-form-id",
      id: e.target.id
    })
    document.getElementById("load-balancer-form-id").classList.toggle("hide");
  }
  DatabaseServer = (e) => {
    console.log("helllo");
    this.setState({
      active: "database-server-form-id",
      id: e.target.id
    })
    document.getElementById("database-server-form-id").classList.toggle("hide");
  }
  SecurityGroup = (e) => {
    console.log("helllo");
    this.setState({
      active: "security-group-form-id",
      id: e.target.id
    })
    document.getElementById("security-group-form-id").classList.toggle("hide");
  }
  saveMyStore(store) {
    count = store;
    console.log("updated store", JSON.stringify(count));
  }
  render() {
    var clone;
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Delete") && (this.state.selected != null)) {
        var item = document.getElementById(this.state.selected);
        console.log(item);
        item.parentNode.removeChild(item);
        this.setState({
          active: null,
          id: null,
          selected: null
        })
        for (var i = 0; i <= count.length - 1; i++) {
          if (count[i].id === item.id) {
            console.log("hhhh");
            count.splice(i, 1);
          }
        }
        console.log(count);
      }
    })
    // document.addEventListener("mousedown", (e) => {
    //   selectedElement = e.target.id;
    // })
    document.addEventListener("dragstart", (e) => {
      console.log("in dragstart", e.target.id);
      if (e.target.parentNode.className === "work-space") {
        clone = document.getElementById(e.target.id);
      }
      else {
        clone = e.target.cloneNode(true);
        // e.dataTransfer.setData("widget",clone);
        if (clone.id === "instance") {
          clone.ondblclick = this.ec2;
          clone.onclick = this.selectElement;
        }
        else if (clone.id === "database-server") {
          clone.ondblclick = this.DatabaseServer;
          clone.onclick = this.selectElement;
        }

        else if (clone.id === "subnet") {
          clone.ondblclick = this.Subnet;
          clone.onclick = this.selectElement;
        }
        else if (clone.id === "load-balancer") {
          clone.ondblclick = this.LoadBalancer;
          clone.onclick = this.selectElement;

        }
        else if (clone.id === "security-group") {
          clone.ondblclick = this.SecurityGroup;
          clone.onclick = this.selectElement;
        }
        const id = clone.id;
        clone.id = clone.id + "" + Math.random();
        clone.style.position = 'absolute';
        clone.style.transition = "all 0.1s ease";
        document.getElementById("work-space-id").append(clone);
        console.log(clone);
        count.push({
          id: clone.id,
          serviceName: id,
          properties: [

          ]
        });
        console.log(JSON.stringify(count));
      }
    })
    document.addEventListener("dragover", (e) => {
      if (e.target.id === "work-space-id") {
        clone.style.left = e.screenX - 40 + "px";
        clone.style.top = e.screenY - 120 + "px";
        // console.log(e.clientX,",",e.clientY);
      }
    })
    // document.addEventListener("dragenter",(e)=>{
    //   clone = document.getElementById()
    //   clone.style.left = e.screenX - 40 + "px";
    //     clone.style.top = e.screenY - 120 + "px";
    // })
    return (
      <div className="home-container" >
        <nav className="home-nav" onClick={this.dismiss}>
          <span>Capsule Corp</span>
          <button className="deploy-button" onClick={this.deploy} >Deploy</button>
        </nav>
        <div className="body" >
          <SideBar onClick={this.dismiss} />
          <div className="work-space" id="work-space-id">
          </div>
        </div>
        <div>
          <Parser yaml={this.state.yaml}/>
        </div>
        {this.state.active !== null ? <Subnet saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <DatabaseServer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <SecurityGroup saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <EC2 saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <LoadBalancer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
      </div>
    )
  }
}
