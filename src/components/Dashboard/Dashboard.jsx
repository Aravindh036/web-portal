import React, { Component } from 'react';

import './Dashboard.css';
import Card from './Card/Card';

import logo from '../../assets/logo.png';
import user from '../../assets/user.png';
import plus from '../../assets/plus.png';
import { reject } from 'q';

class Dashboard extends Component {
    state = {
        projects: null
    }
    componentDidMount = () => {
        var that = this;
        this.email = sessionStorage.getItem('email');
        if(!this.email){
            document.location = '';
        }
        fetch('http://localhost:2019/dashboard/r.eniyanilavan@gmail.com',{
            method:"GET",
        })
        .then(res=>{
            if(res.status === 200){
                return res.json()
            }
            else{
                alert("Something went wrong")
                throw 404;
            }
        })
        .then(res=>{
            console.log(res);
            var arr = res.archs;
            var projects = arr.map(pro => {
                var date = (new Date(pro.doc).toDateString());
                return <Card title={pro.name} doc={date} json={pro.json} />
            });
            that.setState({
                projects: projects
            });
        })
        .catch(err=>{
            // alert("Something went wrong")
            console.log("vauva",err);
            // document.location.reload();
        })
    }

    new = ()=>{
        
    }

    render() {
        return (
            <div className="dashboard-container" >
                <nav className="dashboard-nav">
                    <div className="logo-container">
                        <img src={logo} alt="su" />
                        <div className="product-name">
                            <span>su  </span>
                            <span>PILVI</span>
                        </div>
                    </div>
                    <div className="profile">
                        <img src={user} alt="U" />
                    </div>
                </nav>
                <div className="project-container">
                    <div className="project-heading">My Projects</div>
                    <div className="project-listview" id="list-id" >
                        <div onClick={this.new} className="card-container override-card">
                            <div className="add-project">
                                <div className="add-symbol">
                                    <img src={plus} alt="+" />
                                </div>
                                <span>Add Project</span>
                            </div>
                        </div>
                        {this.state.projects}
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;