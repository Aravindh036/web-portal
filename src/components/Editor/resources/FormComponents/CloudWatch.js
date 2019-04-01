import React, { Component } from 'react'

import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';

var threshold = {
    GreaterThanOrEqualToThreshold:">= Threshold",
    GreaterThanThreshold:"> Threshold",
    LessThanOrEqualToThreshold:"<= Threshold",
    LessThanThreshold:"< Threshold",
    "":"Select a Comparitor"
}
export default class CloudWatch extends Component {
    state = {
        name: "",
        InstanceName: "",
        Period: "",
        EvaluationPeriods: "",
        Threshold: "",
        Email: "",
        ComparisonOperator: "",
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
        var instance = this.props.getInstance();
        if (Object.keys(store[selectedID].properties).length !== 0) {
            this.setState({ ...store[selectedID].properties }, () => {
                document.getElementById("alarm-name-id").value = this.state.name;
                document.getElementById("drop-head-instance").innerHTML = instance[this.state.InstanceName]?instance[this.state.InstanceName].properties.name:'Select a Instance';
                document.getElementById("drop-head-id").innerHTML = threshold[this.state.ComparisonOperator];
                document.getElementById("period-id").value = this.state.Period;
                document.getElementById("evaluation-period-id").value = this.state.EvaluationPeriods;
                document.getElementById("threshold-id").value = this.state.Threshold;
                document.getElementById("mail-id").value = this.state.Email;
            })
        }
        document.getElementById('drop-head-id').addEventListener('click', () => {
            document.getElementById('drop-id').classList.toggle('hide');
        });

        document.getElementById('drop-id').addEventListener('click', (e) => {
            document.getElementById("drop-id").classList.toggle('hide');
            document.getElementById('drop-head-id').innerHTML = e.target.innerHTML;
            var operator;
            if (e.target.innerHTML.includes('&gt;=')) {
                operator = "GreaterThanOrEqualToThreshold"
            }
            else if (e.target.innerHTML.includes('&gt;')) {
                operator = "GreaterThanThreshold";
            }
            else if (e.target.innerHTML.includes('&lt;=')) {
                operator = "LessThanOrEqualToThreshold"
            }
            else if (e.target.innerHTML.includes('&lt;')) {
                operator = "LessThanThreshold";
            }
            this.setState({
                ComparisonOperator: operator
            }, () => {
            });
        })
        document.getElementById('drop-head-instance').addEventListener('click', () => {
            document.getElementById('drop-instance').classList.toggle('hide');
          });
      
          document.getElementById('drop-instance').addEventListener('click', (e) => {
            document.getElementById("drop-instance").classList.toggle('hide');
            if (!e.target.innerHTML.includes("No Instance created")) {
              document.getElementById('drop-head-instance').innerHTML = e.target.innerHTML;
              this.setState({
                InstanceName: e.target.id
              });
            }
          })
    }
    getName = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    getInstanceName = (e) => {
        this.setState({
            InstanceName: e.target.value
        });
    }
    getPeriod = (e) => {
        this.setState({
            Period: e.target.value
        });
    }
    getEvaluationPeriods = (e) => {
        this.setState({
            EvaluationPeriods: e.target.value
        });
    }
    getThreshold = (e) => {
        this.setState({
            Threshold: e.target.value
        });
    }
    getMail = (e) => {
        this.setState({
            Email: e.target.value
        });
    }
    saveForm = () => {
        if (this.state.name === "") {
            alert("Give a name for the Alarm!!");
            return;
        }
        else if (this.state.EvaluationPeriods === "") {
            alert("Give the Evaluation period for the Alarm");
            return;

        }
        else if (this.state.Threshold === "") {
            alert("Give the threshold value for triggering the Alarm");
            return;

        }
        else if (this.state.ComparisonOperator === "") {
            alert("Mention the comparison operator");
        }
        else if(this.state.Email===""){
            alert("Mention the mail id to get the alarm notification");
        }
        if ((this.state.name !== "") && (this.state.EvaluationPeriods !== "") && (this.state.Threshold !== "") && (this.state.ComparisonOperator !== "") && (this.state.Email !== "")) {
            var store = this.props.store();
            var selectedID = this.props.getSelected();
            // for (var i = 0; i <= store.length - 1; i++) {
            //   if (store[i].id === selectedID) {
            //     store[i].properties = this.state
            //   }
            // }
            store[selectedID].properties = this.state;
            this.props.saveStore(store);
            document.getElementById('properties').style.right = "-314px";
            this.props.remove();
        }
    }
    render() {
        var subnet = this.props.getInstance();
        var subnetDropdown = "";
        if (Object.values(subnet).length !== 0) {
          subnetDropdown = Object.values(subnet).map(sub => {
            return <div id={sub.id} className="drop-down-item">{sub.properties.name}</div>
          })
        }
        else {
          subnet = [1];
          subnetDropdown = subnet.map(empty => {
            return <div className="drop-down-item">No Instance created</div>
          })
        }
        return (
            <div className="ec2-form" id="cloud-watch-form-id">
                <div className="form-elements">
                    <input type="text" placeholder="AlarmName" id="alarm-name-id" onBlur={this.getName} />
                    {/* <input type="text" placeholder="InstanceName" id="instance-name-id" onBlur={this.getInstanceName} /> */}
                    <div className="drop-down-container">
                        <div className="drop-tag">
                        <div className="drop-head" id="drop-head-instance">
                            Select a Instance
                        </div>
                        <div className="arrow"><img src={arrow} alt="⥮" /></div>
                        </div>
                        <div className="drop-down hide" id="drop-instance">
                        {/* <div className="drop-down-item">Amazon Linux 2 AMI</div> */}
                        {subnetDropdown}
                        </div>
                    </div>
                    <input type="email" name="email-id" id="mail-id" onBlur={this.getMail} placeholder="Email" />
                    <input type="number" id="period-id" placeholder="Periods (secs)" onBlur={this.getPeriod} />
                    <div className="drop-down-container">
                        <div className="drop-tag">
                            <div className="drop-head" id="drop-head-id">
                                select a Comparison Operator
                        </div>
                            <div className="arrow"><img src={arrow} alt="⥮" /></div>
                        </div>
                        <div className="drop-down hide" id="drop-id">
                            <div className="drop-down-item"> >= Threshold</div>
                            <div className="drop-down-item"> > Threshold</div>
                            <div className="drop-down-item"> {"< Threshold"}</div>
                            <div className="drop-down-item"> {"<= Threshold"}</div>
                        </div>
                    </div>
                    <input type="number" id="evaluation-period-id" placeholder="Evaluation Period" onBlur={this.getEvaluationPeriods} />
                    <input type="number" id="threshold-id" placeholder="Threshold" onBlur={this.getThreshold} />
                </div>
                <button onClick={this.saveForm} >Save</button>
            </div>
        )
    }
}