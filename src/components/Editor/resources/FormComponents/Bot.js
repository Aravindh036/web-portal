import React, { Component } from 'react';
import arrow from '../../../../assets/drop@2x.png'

import './FormComponents.css';

export default class Bot extends Component {
  state = {
    name: "",
    file_name:"No file choosen",
    file_content:"",
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
        document.getElementById("bot-name-id").value = this.state.name;
      })
    }
  }
  getName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  file_extract = ()=>{
    var file_selector = document.getElementById('file-selector');
    var file = file_selector.files[0];
    document.getElementById('file-name').innerText = file_selector.files[0].name;
    if(file){
        var reader = new FileReader();
        reader.readAsText(file,"UTF-8");
        reader.onload = (data)=>{
            this.setState({file_content:data.target.result,file_name:file_selector.files[0].name})
        }
        reader.onerror = (err)=>{
            console.log(err);
        }
    }
  }
  chooseFile = ()=>{
      var file_selector = document.getElementById('file-selector');
      file_selector.onchange = this.file_extract;
      file_selector.click();
  }
  saveForm = () => {
    // console.log("hello");
    if (this.state.name === "") {
      alert("Give a name for the Bot!!!");
      return;
    }
    else if (this.state.file_name === "") {
      alert("Specify the Cidr address");
      return;
    }
    if ((this.state.name !== "")) {
      console.log(this.state);
      var store = this.props.store();
      var selectedID = this.props.getSelected();
      store[selectedID].properties = this.state;
      console.log("inside the save button", store);
      this.props.saveStore(store);
      this.props.remove();
      document.getElementById('properties').style.right = "-314px";
      console.log("count", store);
    }
  }
  render() {
    return (
      <div className="ec2-form " id="private-subnet-form-id">
        <div className="form-elements">
          <label>Name</label>
          <input type="text" placeholder="Bot Name" id="bot-name-id" onBlur={this.getName} />
          <label>Description</label>
          <input type="text" placeholder="Bot Name" id="bot-name-id" onBlur={this.getName} />
          <label>Conclusion Statements</label>
          <div>
            <button onClick={this.chooseFile}>Choose File</button>
            <label id = "file-name" className="file-name">{this.state.file_name}</label>
          </div>
          <label>Confirmation Prompts</label>
          <div>
            <button onClick={this.chooseFile}>Choose File</button>
            <label id = "file-name" className="file-name">{this.state.file_name}</label>
          </div>
          <input type="file" accept="text/csv" id = "file-selector" multiple={false} style={{display:"none"}}/>
        </div>
        <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }
}
