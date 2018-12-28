import React, { Component } from 'react';

import './Parser.modules.css';

import Json from './Json';
import Xaml from './Xaml';
class Parser extends Component {
    state = {
        content: "json"
    }
    selectJson = (e) => {
        if (this.state.content === "json")
            return;
        else {
            this.setState({
                content: "json"
            });
            document.getElementById("json-id").classList.add("json-selected");
            document.getElementById("xaml-id").classList.remove("xaml-selected");
        }
    }
    selectXaml = () => {
        if (this.state.content === "xaml")
            return;
        else {
            this.setState({
                content: "xaml"
            });
            document.getElementById("json-id").classList.remove("json-selected");
            document.getElementById("xaml-id").classList.add("xaml-selected");
        }
    }
    render() {
        var content;
        if (this.state.content === "json") {
            content = <Json />;
        }
        else {
            content = <Xaml />;
        }
        return (
            <div className="parser-nav">
                <nav className="json-xaml">
                    <div id="json-id" className="json json-selected" onClick={this.selectJson}>
                        JSON
                    </div>
                    <div id="xaml-id" className="xaml" onClick={this.selectXaml}>
                        XAML
                    </div>
                </nav>
                <div className="parser-container">
                    {content}
                </div>
            </div>
        );
    }
}

export default Parser;