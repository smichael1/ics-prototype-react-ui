import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';

import ConfigList from './config_list';
import Tabs from './tabs';
import Tab from './tab';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchConfig} from "../actions";


class HcdChannel extends Component {





    render() {

        return (

            <div>
            <h2>HCD {this.props.hcdChannelName}</h2>

            <Tabs>
                {/*
                <Tab iconClassName={'glyphicon glyphicon-cog'} linkName={'Command'}>
                    <div className="tab-pane active">
                        <div className="pull-right">
                            <LoadButton />
                        </div>
                        <h3>Commands</h3>
                        <CommandList />

                        <div className="pull-right">
                            Mode: <button type="button" className="btn btn-success">Normal</button>
                        </div>
                        <h3>Telemetry</h3>
                        <TelemetryList />
                    </div>
                </Tab>
                */}
                <Tab iconClassName={'glyphicon glyphicon-wrench'} linkName={'Configure'}>
                    <div className="tab-pane active">

                        <h3>Configuration</h3>
                        <ConfigList target="galilHCD" axis={this.props.axis}/>

                    </div>
                </Tab>
                <Tab iconClassName={'glyphicon glyphicon-eye-open'} linkName={'View Logging'}>
                    <p>Not yet implemented</p>
                </Tab>
            </Tabs>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(null, mapDispatchToProps)(HcdChannel);
