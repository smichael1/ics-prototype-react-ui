/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import ConfigListItem from './config_list_item';
import {connect} from 'react-redux';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';



class ConfigList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);

    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    //_addNotification(event) {
    //    event.preventDefault();
    //    this._notificationSystem.addNotification({
    //        message: 'Notification Message',
    //        level: 'success'
    //    })
    //}

    // updates of each config item's data
    onUpdate(data) {
        this.setState(data);
    }

    updateServer() {

        console.log(this.state);

        var arr = [];
        if (this.state) {
            Object.keys(this.state).map((key) =>
                arr.push({
                    name: key,
                    value: this.state[key]
                })
            );
        }

        axios.post('http://localhost:9000/configs', {
                configTarget: this.props.target,
                config: arr
            }
        ).then(response => {
            console.log(response);

            if (response.status == 200) {
                // do it here
                this._notificationSystem.addNotification({
                    title: 'Update Success',
                    message: 'The Configuration was successfully updated',
                    level: 'success',
                    position: 'tl'
                });

            } else {
                this._notificationSystem.addNotification({
                    title: 'Update Error',
                    message: 'Error updating configuration: ' + response.status,
                    level: 'error',
                    position: 'tl'
                });
            }

        });


    }

    renderList() {

        const componentConfigs = (this.props.target == "singleAxis") ?
            this.props.assemblyConfigs : this.props.hcdConfigs;


            return componentConfigs.map((config) => {


            //const commandState = (this.props.commandStatus && this.props.commandStatus.commandSetupConfig == command.commandSetupConfig) ? this.props.commandStatus.overallStatus : command.commandState
            
            return (
                <ConfigListItem key={config.name} configName={config.name}
                                 configValue={config.value} onUpdate={this.onUpdate.bind(this)} />
            );

        });
    }

    render() {
    return (
        <form className="form-inline">

            <NotificationSystem ref="notificationSystem"  />
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {this.renderList()}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" onClick={() => this.updateServer()}>Update</button>
        </form>
    );
    }

}

function mapStateToProps(state) {

    // this is where we decide which data to put into the component
    // if it is an HCD config, then use the hcdConfig

        return {
            assemblyConfigs: state.assemblyConfigs,
            hcdConfigs: state.hcdConfigs
        }


}

export default connect(mapStateToProps)(ConfigList);