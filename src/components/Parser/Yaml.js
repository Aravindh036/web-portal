import React, { Component } from 'react'
import './Parser.modules.css'
export default class Yaml extends Component {
  render() {
    console.log("hello",this.props.yaml);
    return (
      <div className="yaml-container">
        {this.props.yaml}
      </div>
    )
  }
}
