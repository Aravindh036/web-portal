import React, { Component } from 'react';

import './FormComponents.css';



export default class DBSubnet extends Component {
    state = {
        name:"",
        description:"",
        subnetIDs:"",
        x:0,
        y:0
    }
    constructor(props){
        super(props);
        this.state.x = this.props.x;
        this.state.y = this.props.y;
    }
    componentDidMount(){
        var store = this.props.store();
        var selectedID = this.props.getSelected();
        if(Object.keys(store[selectedID].properties).length !== 0){
            this.setState({...store[selectedID].properties},()=>{
                document.getElementById("alarm-name-id").value = this.state.name;
                document.getElementById("dbsubnet-des-id").value = this.state.description;
                document.getElementById("dbsubnet-id").value = this.state.subnetIDs; 
            })
        }
    }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    getDescription=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    getsubnetIDs=(e)=>{
        this.setState({
            subnetIDs:e.target.value
        });
    }
    saveForm = () => {
        if ((this.state.name !== "") && (this.state.subnetIDs !== "")) {
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
        return (
            <div className="ec2-form " id="dbsubnet-form-id">
                <div className="form-elements">
                    <input type="text" placeholder="DBSubnet Name" id="alarm-name-id" onBlur={this.getName} />
                    <input type="text" placeholder="DBSubnet Description" id="dbsubnet-des-id" onBlur={this.getDescription} />
                    <input type="text" placeholder="DBSubnet ID(s)" id="dbsubnet-id" onBlur={this.getsubnetIDs} />
                </div>
                <button onClick={this.saveForm} >Save</button>
            </div>
        )
    }
}
