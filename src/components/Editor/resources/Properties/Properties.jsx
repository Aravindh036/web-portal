import React, { Component } from 'react';

class Properties extends Component {
    shouldComponentUpdate(){
        // console.log('jjjjj');
        return true;
    }
    render() {
        return (
            <div id="properties" className="properties">
                <div className="properties-container">
                    <div className="properties-title">
                        Properties
                </div>
                    {this.props.properties}
                </div>
            </div>
        );
    }
}

export default Properties;