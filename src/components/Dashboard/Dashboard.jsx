import React, { Component } from 'react';

import './Dashboard.css';
import Card from './Card/Card';

import logo from '../../assets/logo.png';
import user from '../../assets/user.png';
import plus from '../../assets/plus.png';

class Dashboard extends Component {
    state = {
        projects: null
    }
    componentDidMount = () => {
        var arr = [1, 2, 3, 4, 5, 56, 6];
        var projects = arr.map(pro => {
            return <Card />
        });
        this.setState({
            projects: projects
        });
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
                        {this.state.projects}
                        <div className="card-container override-card">
                            <div className="add-project">
                                <div className="add-symbol">
                                    <img src={plus} alt="+" />
                                </div>
                                <span>Add Project</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;