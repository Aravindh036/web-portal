import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';


export default class DatabaseServer extends Component {
  state = {
    DBName: "",
    VPCSecurityGroups: "",
    DBSecurityGroups:"",
    DBSubnet:"",
    AllocatedStorage: "",
    DBInstanceClass: "db.t2.micro",
    Engine: "MySQL",
    MasterUsername: "",
    MasterUserPassword: "",
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
    document.getElementById("drop-head-image").innerHTML = this.state.Engine;
    document.getElementById('drop-head-id').innerHTML = this.state.DBInstanceClass;
    if (Object.keys(store[selectedID].properties).length !== 0) {
      this.setState({ ...store[selectedID].properties }, () => {
        console.log(this.state.Engine);
        document.getElementById("dbname-id").value = this.state.DBName;
        document.getElementById("db-security-groups-id").value = this.state.VPCSecurityGroups;
        document.getElementById("allocated-storage-id").value = this.state.AllocatedStorage;
        document.getElementById("drop-head-image").innerHTML = this.state.Engine;
        document.getElementById("master-username-id").value = this.state.MasterUsername;
        document.getElementById("master-password-id").value = this.state.MasterUserPassword;
        document.getElementById('drop-head-id').innerHTML = this.state.DBInstanceClass;
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
        DBInstanceClass: e.target.innerHTML
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
        Engine: e.target.innerHTML
      });
    })
  }
  getDBSecurityGroups = (e) => {
    this.setState({
      DBSecurityGroups: e.target.value
    })
  }
  getAllocatedStorage = (e) => {
    this.setState({
      AllocatedStorage: e.target.value
    })
  }
  getDBInstanceClass = (e) => {
    this.setState({
      DBInstanceClass: e.target.value
    })
  }
  getEngine = (e) => {
    this.setState({
      Engine: e.target.value
    })
  }
  getMasterUsername = (e) => {
    this.setState({
      MasterUsername: e.target.value
    })
  }
  getMasterUserPassword = (e) => {
    this.setState({
      MasterUserPassword: e.target.value
    })
  }
  getDBName = (e) => {
    this.setState({
      DBName: e.target.value
    })
  }
  getInstance = (e) => {
    // console.log(e.target.value);
  }

  saveForm = () => {
    if (this.state.DBName === "") {
      alert("Give a name for the RDS Instance!!");
      return;
    }
    else if (this.state.DBInstanceClass === "") {
      alert("Give the Instance class");
      return;
    }
    if ((this.state.DBName !== "") && (this.state.DBInstanceClass !== "")) {
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
    // const id = this.props.currentComponent();
    // console.log("id", id);
    return (
      <div className="ec2-form " id="database-server-form-id">
        <div className="form-elements">
          <input type="text" placeholder="DBName" id="dbname-id" onBlur={this.getDBName} />
          <input onBlur={this.getDBSecurityGroups} type="text" placeholder="DBSecurityGroups" id="db-security-groups-id" />
          <input onBlur={this.getAllocatedStorage} type="number" placeholder="AllocatedStorage" id="allocated-storage-id" />
          {/* <select onChange={this.getDBInstanceClass} name="DBInstanceClass" id="db-instance-class-id">
            <option value="db.t2.micro">db.t2.micro</option>
            <option value="db.t2.small">db.t2.small</option>
            <option value="db.t2.medium">db.t2.medium</option>
            <option value="db.t2.large">db.t2.large</option>
            <option value="db.t2.xlarge">db.t2.xlarge</option>
          </select> */}
          <div className="drop-down-container">
            <div className="drop-tag">
              <div className="drop-head" id="drop-head-id">
                {this.state.DBInstanceClass}
              </div>
              <div className="arrow"><img src={arrow} alt="⥮" /></div>
            </div>
            <div className="drop-down hide" id="drop-id">
              <div className="drop-down-item">db.t2.nano</div>
              <div className="drop-down-item">db.t2.micro</div>
              <div className="drop-down-item">db.t2.small</div>
              <div className="drop-down-item">db.t2.medium</div>
              <div className="drop-down-item">db.t2.large</div>
            </div>
          </div>
          {/* <input onBlur={this.getEngine} type="text" placeholder="Engine" id="engine-id" /> */}
          {/* <select name="engine" id="engine-id" onChange={this.getEngine} >
            <option value="MySQL">MySQL</option>
            <option value="MariaDB">MariaDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="Oracle">Oracle</option>
            <option value="SQL Server">SQL Server</option>
          </select> */}
          <div className="drop-down-container">
          <div className="drop-tag">
            <div className="drop-head" id="drop-head-image">
              {this.state.Engine}
            </div>
            <div className="arrow"><img src={arrow} alt="⥮"/></div>
          </div>
            <div className="drop-down hide" id="drop-image">
              <div className="drop-down-item">MySQL</div>
              <div className="drop-down-item">MariaDB</div>
              <div className="drop-down-item">PostgreSQL</div>
              <div className="drop-down-item">Oracle</div>
              <div className="drop-down-item">SQL Server</div>
            </div>
          </div>
          <input onBlur={this.getMasterUsername} type="text" placeholder="MasterUsername" id="master-username-id" />
          <input onBlur={this.getMasterUserPassword} type="password" id="master-password-id" placeholder="MasterUserPassword" />
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}