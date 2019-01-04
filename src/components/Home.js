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
import CloudWatch from './FormComponents/CloudWatch';
var count = [];

export default class Home extends Component {
  state = {
    active: null,
    id: null,
    yaml:"Deploy to get the yaml",
    json:"Deploy to get the json",
  }
  deploy=()=>{
    var yaml = deploy([{"id":"subnet0.11706778980718924","serviceName":"subnet","properties":{"name":"subnet1","CidrBlock":"172.31.0.0/20","SubnetType":false}},{"id":"subnet0.8245752919067497","serviceName":"subnet","properties":{"name":"subnet2","CidrBlock":"172.31.16.0/20","SubnetType":"true"}},{"id":"load-balancer0.05362829721258744","serviceName":"load-balancer","properties":{"InstancePort":"80","LoadBalancerPort":"80","PolicyNames":"","Protocol":"https","LoadBalancerName":"lb","SecurityGroup":"lbgrp","Subnet":"subnet1"}},{"id":"instance0.41395720435820116","serviceName":"instance","properties":{"name":"webserver1","AvailabilityZone":"us-east-1a","KeyName":"windows","InstanceType":"t2.micro","ImageID":"ami-041114ddee4a98333","SubnetName":"subnet1","SecurityGroup":"web1grp","Backup":true}},{"id":"instance0.6227855659915429","serviceName":"instance","properties":{"name":"webserver2","AvailabilityZone":"us-east-1a","KeyName":"windows","InstanceType":"t2.micro","ImageID":"ami-e24b7d9d","SubnetName":"subnet1","SecurityGroup":"wbgrp2","Backup":false}},{"id":"database-server0.760227466020251","serviceName":"database-server","properties":{"DBName":"dbserver","VPCSecurityGroups":"","AllocatedStorage":"10","DBInstanceClass":"db.t2.micro","Engine":"MySQL","MasterUsername":"root","MasterUserPassword":"eniyan007","DBSecurityGroups":"dbgrp"}},{"id":"security-group0.22712235517250856","serviceName":"security-group","properties":{"GroupName":"lbgrp","GroupDescription":"sample","Port":"80,443"}},{"id":"security-group0.00906562568086855","serviceName":"security-group","properties":{"GroupName":"web1grp","GroupDescription":"sample","Port":"80,443,22,3389"}},{"id":"security-group0.2388936306207443","serviceName":"security-group","properties":{"GroupName":"wbgrp2","GroupDescription":"sample","Port":"80,443,22,3389"}},{"id":"security-group0.6053688104790425","serviceName":"security-group","properties":{"GroupName":"dbgrp","GroupDescription":"sample","Port":"22,3389,3306,1403"}},{"id":"cloud-watch0.13543790834419767","serviceName":"cloud-watch","properties":{"name":"alarm","InstanceName":"webserver1","Period":"2","EvaluationPeriods":"500","Threshold":"80","Email":"r.eniyanilavan@gmail.com"}},{"id":"cloud-watch0.25121533502992266","serviceName":"cloud-watch","properties":{"name":"alarm2","InstanceName":"webserver2","Period":"2","EvaluationPeriods":"500","Threshold":"80","Email":"r.eniyanilavan@gmail.com"}}]);
    this.setState({
      yaml:yaml
    },()=>{
        var request = new Request("http://localhost:5000/deploy",{
          method:"POST",
          body:JSON.stringify({"yaml":this.state.yaml}),
          headers: new Headers({"Content-Type":"application/json"})
        });
        fetch(request)
        .then(res=>{
          console.log(res);
        })
        .catch(e=>{
          console.log(e);
        })
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
  CloudWatch = (e)=>{
    console.log("helllo");
    this.setState({
      active: "cloud-watch-form-id",
      id: e.target.id
    })
    document.getElementById("cloud-watch-form-id").classList.toggle("hide"); 
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
        else if (clone.id === "cloud-watch") {
          clone.ondblclick = this.CloudWatch;
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
        <nav className="home-nav">
          <span>Pilvi Automaatori</span>
          <button className="deploy-button" onClick={this.deploy} >Deploy</button>
        </nav>
        <div className="body" >
          <SideBar onClick={this.dismiss} />
          <div className="work-space" id="work-space-id">
          </div>
        </div>
        <div>
          <Parser yaml={this.state.yaml} json={this.state.json} />
        </div>
        {this.state.active !== null ? <Subnet saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <DatabaseServer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <SecurityGroup saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <EC2 saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <LoadBalancer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
        {this.state.active !== null ? <CloudWatch saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} /> : null}
      </div>
    )
  }
}
