import React, { Component } from 'react'
import './FormComponents.css';
export default class DatabaseServer extends Component {
  state = {
    DBName: "",
    VPCSecurityGroups: "",
    AllocatedStorage: "",
    DBInstanceClass: "db.t2.micro",
    Engine: "MySQL",
    MasterUsername: "",
    MasterUserPassword: ""
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
    console.log(e.target.value);
  }

  saveForm = () => {
    if ((this.state.DBName !== "") && (this.state.DBSecurityGroups !== "") && (this.state.AllocatedStorage !== "") && (this.state.Engine !== "") && (this.state.MasterUsername !== "") && (this.state.MasterUserPassword !== "")) {
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
      document.getElementById("database-server-form-id").classList.toggle("hide");
      document.getElementById("db-security-groups-id").value = "";
      document.getElementById("allocated-storage-id").value = "";
      document.getElementById("engine-id").value = "";
      document.getElementById("master-password-id").value = "";
      document.getElementById("master-username-id").value = "";
      document.getElementById("dbname-id").value = "";
    }
  }
  render() {
    const id = this.props.currentComponent();
    console.log("id", id);
    return (
      <div className="ec2-form hide" id="database-server-form-id">
        <div className="form-elements">
          <input type="text" placeholder="DBName" id="dbname-id" onBlur={this.getDBName} />
          <input onBlur={this.getDBSecurityGroups} type="text" placeholder="DBSecurityGroups" id="db-security-groups-id" />
          <input onBlur={this.getAllocatedStorage} type="number" placeholder="AllocatedStorage" id="allocated-storage-id" />
          <select onChange={this.getDBInstanceClass} name="DBInstanceClass" id="db-instance-class-id">
            <option value="db.t2.micro">db.t2.micro</option>
            <option value="db.t2.small">db.t2.small</option>
            <option value="db.t2.medium">db.t2.medium</option>
            <option value="db.t2.large">db.t2.large</option>
            <option value="db.t2.xlarge">db.t2.xlarge</option>
          </select>
          {/* <input onBlur={this.getEngine} type="text" placeholder="Engine" id="engine-id" /> */}
          <select name="engine" id="engine-id" onChange={this.getEngine} >
            <option value="MySQL">MySQL</option>
            <option value="MariaDB">MariaDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="Oracle">Oracle</option>
            <option value="SQL Server">SQL Server</option>
          </select>
          <input onBlur={this.getMasterUsername} type="text" placeholder="MasterUsername" id="master-username-id" />
          <input onBlur={this.getMasterUserPassword} type="password" id="master-password-id" placeholder="MasterUserPassword" />
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}