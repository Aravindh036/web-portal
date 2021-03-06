import React, { Component } from 'react'

export default class DBSubnet extends Component {
    state = {
        name:"",
        description:"",
        subnetIDs:""
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
          for (var i = 0; i <= store.length - 1; i++) {
            if (store[i].id === selectedID) {
              console.log("hhhh");
              store[i].properties = this.state;
            }
          }
          console.log("inside the save button", store);
          this.props.saveMyStore(store);
          document.getElementById("dbsubnet-form-id").classList.toggle("hide");
          document.getElementById("dbsubnet-name-id").value = "";
          document.getElementById("dbsubnet-id").value = "";
          document.getElementById("dbsubnet-des-id").value = "";
          document.getElementById("dbsubnet-ids").value = "";
        }
      }
    render() {
        return (
            <div className="ec2-form hide" id="dbsubnet-form-id">
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
