import React, { Component } from 'react';

import './FormComponents.css';
import arrow from '../../../../assets/drop@2x.png'



export default class DBSubnet extends Component {
    state = {
        name: "",
        description: "",
        subnetIDs: "",
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
                document.getElementById("alarm-name-id").value = this.state.name;
                document.getElementById("dbsubnet-des-id").value = this.state.description;
                // document.getElementById("dbsubnet-id").value = this.state.subnetIDs;
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
                SubnetName: e.target.id
              });
            }
          })
    }
    getName = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    getDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }
    getsubnetIDs = (e) => {
        this.setState({
            subnetIDs: e.target.value
        });
    }
    saveForm = () => {
        if (this.state.name === "") {
            alert("Give a name for the DB subnet!!");
        }
        else if (this.state.description === "") {
            alert("Give a Description for the DBSubnet");
        }
        else if (this.state.subnetIDs === "") {
            alert("Give SubnetIDs to be connected!!");
        }
        if ((this.state.name !== "") && (this.state.subnetIDs !== "") && (this.state.description !== "")) {
            var store = this.props.store();
            var dbSubnet = this.props.getDBsubnet();
            var selectedID = this.props.getSelected();
            // for (var i = 0; i <= store.length - 1; i++) {
            //   if (store[i].id === selectedID) {
            //     console.log("hhhh");
            //     store[i].properties = this.state
            //   }
            // }
            store[selectedID].properties = this.state;
            dbSubnet[selectedID].properties = this.state;
            console.log("inside the save button", store);
            this.props.saveStore(store);
            this.props.remove();
            document.getElementById('properties').style.right = "-314px";
        }
    }
    render() {
        var subnet = this.props.getSubnet();
        var subnetDropdown = "";
        console.log(subnet,"hiiiiiiii");
        if (Object.values(subnet).length !== 0) {
          subnetDropdown = Object.values(subnet).map(sub => {
            return <div id={sub.id} className="drop-down-item">{sub.properties.name}</div>
          })
        }
        else {
          subnet = [1];
          subnetDropdown = subnet.map(empty => {
            return <div className="drop-down-item">No subnets created</div>
          })
        }
        return (
            <div className="ec2-form " id="dbsubnet-form-id">
                <div className="form-elements">
                    <input type="text" placeholder="DBSubnet Name" id="alarm-name-id" onBlur={this.getName} />
                    <input type="text" placeholder="DBSubnet Description" id="dbsubnet-des-id" onBlur={this.getDescription} />
                    {/* <input type="text" placeholder="Subnet ID(s)" id="dbsubnet-id" onBlur={this.getsubnetIDs} /> */}
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
                <button onClick={this.saveForm} >Save</button>
            </div>
        )
    }
}
