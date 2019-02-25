import React, {Component} from 'react';

export default class Instance extends Component{
    state = {
        name:"",
        AvailabilityZone:"",
        KeyName:"",
        InstanceType:"",
        ImageId:"",
        Subnet:"",
        SecurityGroup:"",
        Backup:"",
        EventLog:""
    }
    render(){
        return(
            <div className="instance-property">
                
            </div>
        )
    }
}