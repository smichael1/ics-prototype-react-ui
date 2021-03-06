import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';

import ConfigList from './config_list';
import Assembly from './assembly';
import HcdChannel from './hcd_channel';
import HcdDashboard from './hcd_dashboard';
import NavLink from './nav_link';


class App extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activeLinkName: 'Dashboard',
            activePanelType: 'Dashboard'
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(linkName, panelType) {
        this.setState({
            activeLinkName: linkName,
            activePanelType: panelType
        });

    }


    // Render current active tab content
    renderActiveTabContent() {

        if (this.state.activePanelType === 'Dashboard')
            return (
                <HcdDashboard />
            )
        if (this.state.activePanelType === 'Assembly')
        return (
            <Assembly assemblyName={this.state.activeLinkName} />
        )
        if (this.state.activePanelType === 'Hcd')
            return (
                <HcdChannel hcdChannelName={this.state.activeLinkName} axis={this.state.activeLinkName[this.state.activeLinkName.length-1]}/>
            )
        return (<p>unknown</p>)

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">

                    <nav className="navbar navbar-default navbar-fixed-side">
                        <div className="container">
                            <div className="navbar-header">

                                <a className="navbar-brand" href="./">ICS Stimulus Prototype</a>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">

                                    <li className="divider"></li>
                                    <li className="dropdown"><a className="dropdown-toggle" href="#">Applications <b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Dashboard' onClick={this.handleTabClick} panelType='Dashboard' />
                                        </ul>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown"><a className="dropdown-toggle" href="#">Assemblies <b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Fiber Source Assembly' onClick={this.handleTabClick} panelType='Assembly'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='DM Optic Assembly' onClick={this.handleTabClick} panelType="Assembly"/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Pupil Stage Assembly' onClick={this.handleTabClick} panelType="Assembly"/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Stimulus Insertion Assembly' onClick={this.handleTabClick} panelType="Assembly"/>
                                        </ul>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown"><a className="dropdown-toggle" href="#">Galil HCD <b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel A' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel B' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel C' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel D' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel E' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel F' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel G' onClick={this.handleTabClick} panelType='Hcd'/>
                                            <NavLink iconClassName='' activeLinkName={this.state.activeLinkName} linkName='Channel H' onClick={this.handleTabClick} panelType='Hcd'/>
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>

                </div>


                <div className="col-md-9">

                    {this.renderActiveTabContent()}

                </div>

            </div>

        );
    }



};

App.propTypes = {
    defaultActiveLinkName: React.PropTypes.string,
    defaultActivePanelType: React.PropTypes.string
};

App.defaultProps = {
    defaultActiveLinkName: 'Dashboard',
    defaultActivePanelType: 'Dashboard'
};


export default App;