import React, { Component } from 'react'

import './FormComponents.css';

export default class CloudWatch extends Component {
    state = {
        name: "",
        InstanceName: "",
        Period: "",
        EvaluationPeriods: "",
        Threshold: "",
        Email:"",
        x:0,
        y:0
    }
    constructor(props){
        super(props);
        this.state.x = this.props.x;
        this.state.y = this.props.y;
      }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    getInstanceName=(e)=>{
        this.setState({
            InstanceName:e.target.value
        });
    }
    getPeriod=(e)=>{
        this.setState({
            Period:e.target.value
        });
    }
    getEvaluationPeriods=(e)=>{
        this.setState({
            EvaluationPeriods:e.target.value
        });
    }
    getThreshold=(e)=>{
        this.setState({
            Threshold:e.target.value
        });
    }
    getMail=(e)=>{
        this.setState({
            Email:e.target.value
        });
    }
    saveForm = () => {
        if ((this.state.CidrBlock !== "") && (this.state.VpcId !== "")) {
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
          this.props.saveStore(store);
          document.getElementById("alarm-name-id").value = "";
          document.getElementById("instance-name-id").value = "";
          document.getElementById("period-id").value = "";
          document.getElementById("evaluation-period-id").value = "";
          document.getElementById("threshold-id").value = "";
          document.getElementById("mail-id").value = "";
        }
      }
    render() {
        return (
            <div className="ec2-form" id="cloud-watch-form-id">
                <div className="form-elements">
                    <input type="text" placeholder="AlarmName" id="alarm-name-id" onBlur={this.getName} />
                    <input type="text" placeholder="InstanceName" id="instance-name-id" onBlur={this.getInstanceName} />
                    <input type="email" name="email-id" id="mail-id" onBlur={this.getMail} placeholder="Email"/>
                    <input type="number" id="period-id" placeholder="Periods (secs)" onBlur={this.getPeriod} />
                    <input type="number" id="evaluation-period-id" placeholder="Evaluation Period" onBlur={this.getEvaluationPeriods} />
                    <input type="number" id="threshold-id" placeholder="Threshold" onBlur={this.getThreshold} />
                </div>
                <button onClick={this.saveForm} >Save</button>
            </div>
        )
    }
}