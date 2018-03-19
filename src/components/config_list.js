/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import ConfigListItem from './config_list_item';
import {connect} from 'react-redux';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from "redux";
import {fetchConfig} from '../actions/index';



class ConfigList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);

    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        console.log("ConfigList::MOUNT")

        // fetch all configs for each axis when component first mounts
        this.fetchAll()

    }


    fetchAll() {
        this.props.fetchConfig("galilHCD", "A");
        this.props.fetchConfig("galilHCD", "B");
        this.props.fetchConfig("galilHCD", "C");
        this.props.fetchConfig("galilHCD", "D");
        this.props.fetchConfig("galilHCD", "E");
        this.props.fetchConfig("galilHCD", "F");
        this.props.fetchConfig("galilHCD", "G");
        this.props.fetchConfig("galilHCD", "H");

    }



    componentDidUpdate() {
        // refresh should reset the data
        console.log("UPDATE")
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

        this.setState(data)
        /*
        if (this.state == null || this.state.updates == null) {
            this.setState({updates: data})
        } else  {
            this.setState(updates[data.key] = data.value);
            console.log("state = ")
            console.log(this.state)
        }
        */
    }

    substitute(arr, key, value) {
        let obj = arr.find((o, i) => {
            if (o.name === key) {
                arr[i] = {name: key, value: value};
                return true; // stop searching
            }
        });
    }


    updateServer() {
        console.log("updateServer:: state = ");
        console.log(this.state);

        var arr = [];

        this.props.hcdConfigs.axes[this.props.axis].props.forEach(prop => {
            arr.push(prop)
        })

        if (this.state) {
            Object.keys(this.state).map((key) =>
                // search through an array for a field value (name = InterpolationCounts)
                this.substitute(arr, key, this.state[key])
                //arr.push({
                //    name: key,
                //    value: this.state[key]
                //})
            );
        }



        const jsonString = JSON.stringify({props: arr})

        console.log("JSON String = " + jsonString)


        axios.post('http://localhost:9000/v1/gs/setConfig?axis=' + this.props.axis, {
                data: jsonString
            }
        ).then(response => {
            //console.log(response);

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

            // Update the list here
            this.props.fetchConfig("galilHCD", this.props.axis);


        });



    }

    renderList() {

        console.log("renderList::hcdConfigs = ")
        console.log(this.props.hcdConfigs)

        const componentConfigs = (this.props.target == "singleAxis") ?
            this.props.assemblyConfigs : (this.props.hcdConfigs.length == 0) ? this.props.hcdConfigs : this.props.hcdConfigs.axes[this.props.axis].props;

            console.log("componentConfigs: " + this.props.axis)
            console.log(componentConfigs)

            return componentConfigs.map((config) => {

                //console.log(config)
                //const commandState = (this.props.commandStatus && this.props.commandStatus.commandSetupConfig == command.commandSetupConfig) ? this.props.commandStatus.overallStatus : command.commandState

                // key is config.name and the axis, since this component is used by each axis page and they should be unique
            return (
                <ConfigListItem key={config.name + "_" + this.props.axis} configName={config.name}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);