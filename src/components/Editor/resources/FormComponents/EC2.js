import React, { Component } from 'react';

import arrow from '../../../../assets/drop@2x.png'
import './FormComponents.css';


export default class EC2 extends Component {
  state = {
    name: "",
    AvailabilityZone: "us-east-1a",
    KeyName: "",
    InstanceType: "t2.nano",
    ImageID: "ami-04bfee437f38a691e",
    SubnetName: "",
    SecurityGroup: "",
    Backup: false,
    EventLog: false,
    x: 0,
    y: 0
  }
  ami_id = {
    "mumbai": {
      "Amazon Linux 2 AMI": "ami-0b4e9d7246704847c",
      "Amazon Linux AMI 2018.03.0": "ami-0ad42f4f66f6c1cc9",
      "Ubuntu Server 18.04": "ami-0d773a3b7bb2bb1c1",
      "Windows Server 2019 Base": "ami-0c26d71e2b3583a67",
      "Windows Server 2016 Base": "ami-0be56865bcf08da0d"
    },
    "us-east-1a": {
      "Amazon Linux 2 AMI": "ami-04bfee437f38a691e",
      "Amazon Linux AMI 2018.03.0": "ami-0080e4c5bc078760e",
      "Ubuntu Server 18.04": "ami-0ac019f4fcb7cb7e6",
      "Windows Server 2019 Base": "ami-0410d3d3bd6d555f4",
      "Windows Server 2016 Base": "ami-0bf148826ef491d16"
    }
  }
  instance_id = {
    "mumbai": {
      "ami-0b4e9d7246704847c": "Amazon Linux 2 AMI",
      "ami-0ad42f4f66f6c1cc9": "Amazon Linux AMI 2018.03.0",
      "ami-0d773a3b7bb2bb1c1": "Ubuntu Server 18.04",
      "ami-0c26d71e2b3583a67": "Windows Server 2019 Base",
      "ami-0be56865bcf08da0d": "Windows Server 2016 Base"
    },
    "us-east-1a": {
      "ami-04bfee437f38a691e": "Amazon Linux 2 AMI",
      "ami-0080e4c5bc078760e": "Amazon Linux AMI 2018.03.0",
      "ami-0ac019f4fcb7cb7e6": "Ubuntu Server 18.04",
      "ami-0410d3d3bd6d555f4": "Windows Server 2019 Base",
      "ami-0bf148826ef491d16": "Windows Server 2016 Base"
    }
  }
  constructor(props) {
    super(props);
    this.state.x = this.props.x;
    this.state.y = this.props.y;
  }
  componentDidMount() {
    var store = this.props.store();
    var selectedID = this.props.getSelected();
    document.getElementById('drop-head-id').innerHTML = this.state.InstanceType;
    document.getElementById('drop-head-image').innerHTML = this.state.ImageID;
    if (Object.keys(store[selectedID].properties).length !== 0) {
      console.log("mount", store[selectedID].properties);
      this.setState({ ...store[selectedID].properties }, () => {
        console.log("updated", this.state)
        document.getElementById("ec2-name-id").value = this.state.name;
        document.getElementById("keyname-id").value = this.state.KeyName;
        document.getElementById("availability-id").value = this.state.AvailabilityZone;
        document.getElementById('checkbox-e').checked = this.state.EventLog;
        document.getElementById('checkbox-b').checked = this.state.Backup;
        // document.getElementById("ec2-subnet-id").value = this.state.SubnetName;
        // document.getElementById("security-groups-id").value = this.state.SecurityGroup;
        document.getElementById('drop-head-id').innerHTML = this.state.InstanceType;
        document.getElementById('drop-head-image').innerHTML = this.instance_id[this.state.AvailabilityZone][this.state.ImageID];
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
        InstanceType: e.target.innerHTML
      });
    })
    document.getElementById('drop-head-image').addEventListener('click', () => {
      document.getElementById('drop-image').classList.toggle('hide');
      // console.log("hhhh");
    });

    document.getElementById('drop-image').addEventListener('click', (e) => {
      document.getElementById("drop-image").classList.toggle('hide');
      // console.log(e.target.innerHTML);
      document.getElementById('drop-head-image').innerHTML = e.target.innerHTML;
      this.setState({
        ImageID: this.ami_id[this.state.AvailabilityZone][e.target.innerHTML]
      });
    })
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
          SubnetName: e.target.innerHTML
        });
      }
    })
    document.getElementById('drop-head-security').addEventListener('click', () => {
      document.getElementById('drop-security').classList.toggle('hide');
      console.log("vauva");
    });

    document.getElementById('drop-security').addEventListener('click', (e) => {
      document.getElementById("drop-security").classList.toggle('hide');
      // console.log(e.target.innerHTML);
      if (!e.target.innerHTML.includes("No Security Group created")) {
        document.getElementById('drop-head-security').innerHTML = e.target.innerHTML;
        this.setState({
          SecurityGroup: e.target.innerHTML
        });
      }
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
  getBackup = (e) => {
    this.setState({
      Backup: !this.state.Backup
    });
    // console.log(this.state.Backup);
  }
  getEventLog = (e) => {
    this.setState({
      EventLog: !this.state.EventLog
    });
  }
  saveForm = () => {
    if (this.state.name === "") {
      alert("Give a name for the Instance!!");
    }
    else if (this.state.AvailabilityZone === "") {
      alert("Give the availability zone for the instance");
    }
    if ((this.state.name !== "") && (this.state.AvailabilityZone !== "")) {
      // console.log(this.state);
      var store = this.props.store();
      var selectedID = this.props.getSelected();
      // for (var i = 0; i <= store.length - 1; i++) {
      //   if (store[i].id === selectedID) {
      //     console.log("hhhh");
      //     store[i].properties = this.state
      //   }
      // }
      this.setState({ ImageID: this.ami_id[this.state.AvailabilityZone][this.state.ImageID] }, () => {
        store[selectedID].properties = this.state;
        console.log("inside the save button", store);
        this.props.remove();
      })
      this.props.saveStore(store);
      document.getElementById('properties').style.right = "-314px";
    }
  }
  render() {
    // if(store.properties===undefined){
    var subnet = this.props.getSubnet();
    var subnetDropdown = "";
    console.log(subnet,"hiiiiiiii");
    if (Object.values(subnet).length !== 0) {
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
    var security = this.props.getSecurity();
    var securitygroup = "";
    if (Object.values(security).length !== 0) {
      securitygroup = Object.values(security).map(sub => {
        return <div className="drop-down-item">{sub.properties.GroupName}</div>
      })
    }
    else {
      security = [1];
      securitygroup = security.map(empty => {
        return <div className="drop-down-item">No Security Group created</div>
      })
    }
    console.log("security",securitygroup);
    console.log("helloeee", subnetDropdown);
    return (
      <div className="ec2-form" id="ec2-form-id">
        <div className="form-elements">
          <input id="ec2-name-id" type="text" placeholder="Name" onBlur={this.getName} />
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
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-id">
                select a Instance Type
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
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
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-image">
                Select a InstanceType
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-image">
              <div className="drop-down-item">Amazon Linux 2 AMI</div>
              <div className="drop-down-item">Amazon Linux AMI 2018.03.0</div>
              <div className="drop-down-item">Ubuntu Server 18.04</div>
              <div className="drop-down-item">Windows Server 2019 Base</div>
              <div className="drop-down-item">Windows Server 2016 Base</div>
            </div>
          </div>
          <div className="automatic-shutdown">
            <div className="conatiner">
              <label className="switch">
                <input type="checkbox" id="checkbox-b" onChange={this.getBackup} />
                <span className="slider round"></span>
              </label>
            </div>
            <label>Automatic Shutdown</label>
          </div>
          <div className="event-log">
            <div className="conatiner">
              <label className="switch">
                <input type="checkbox" id="checkbox-e" onChange={this.getEventLog} />
                <span className="slider round"></span>
              </label>
            </div>
            <label>Event Log</label>
          </div>
          {/* <input type="text" placeholder="SubnetName" id="ec2-subnet-id" onBlur={this.getSubnetName}/> */}
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
          {/* <input type="text" placeholder="SecurityGroups" id="security-groups-id" onBlur={this.getSecurityGroup} /> */}
          <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-security">
                Select a Security Group
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-security">
              {/* <div className="drop-down-item">Amazon Linux 2 AMI</div> */}
              {securitygroup}
            </div>
          </div>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
