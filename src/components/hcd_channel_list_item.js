/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';

import axios from 'axios';
import CommandArg from './command_arg';
import {connect} from "react-redux";


class HcdChannelListItem extends Component {


    constructor(props) {
        super(props);
        this.sendPositionCommand = this.sendPositionCommand.bind(this);
        this.sendStopCommand = this.sendStopCommand.bind(this);
        this.sendInitCommand = this.sendInitCommand.bind(this);
        this.sendHomeCommand = this.sendHomeCommand.bind(this);
        this.state = {positionMethod: "positionAbsolute", positionCounts: 25}

        this.handlePositionMethodChange = this.handlePositionMethodChange.bind(this);
        this.handlePositionCountsChange = this.handlePositionCountsChange.bind(this);

    }



    checkTime(i, n) {

        if (n == 2)  {

            if (i < 10) {
                i = "0" + i;
            }
            return i;
        } else {

            if (i < 10) {
               i = "00" + i;
            } else if (i < 100) {
                i = "0" + i;
            }
            return i;
        }
    }

    nowFormatted() {
        const now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ms = now.getMilliseconds();

        m = this.checkTime(m,2);
        s = this.checkTime(s,2);
        h = this.checkTime(h,2);
        ms = this.checkTime(ms,3);
        return  h + ":" + m + ":" + s + "." + ms;

    }


    sendPositionCommand() {


        const url = 'http://localhost:9000/v1/gs/' + this.state.positionMethod

        this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + this.state.positionMethod + "(" + this.state.positionCounts + " counts) Cmd Sent")

        axios.post(url, this.buildPostForm(this.state.positionCounts)
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + this.state.positionMethod + "(" + this.state.positionCounts + " counts) Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + this.state.positionMethod + " Communication Error")
            console.log(error);
        });

    }

    sendStopCommand() {

        console.log(this.props);

        const url = 'http://localhost:9000/v1/gs/motorOff'

        this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "motorOff" + " Cmd Sent")

        axios.post(url, this.buildPostForm(0)
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "motorOff" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "motorOff" + " Communication Error")
            console.log(error);
        });

    }

    sendInitCommand() {

        const url = 'http://localhost:9000/v1/gs/init'

        this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "init" + " Cmd Sent")

        axios.post(url, this.buildPostForm(0)
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "init" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "init" + " Communication Error")
            console.log(error);
        });

    }

    sendHomeCommand() {

        console.log(this.props);

        const url = 'http://localhost:9000/v1/gs/home'

        this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "home" + " Cmd Sent")

        axios.post(url, this.buildPostForm(0)
        ).then(response => {
            console.log(response)
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "home" + " Cmd Completed: " + response.data)
        }).catch((error) => {
            this.props.updateStatusHistory(this.nowFormatted() + "  Channel " + this.props.channel + ": " + "home" + " Communication Error")
            console.log(error);
        });

    }

    buildPostForm(counts) {
        console.log(this.props);
        const axisConfig = this.getAxisConfigProps();
        console.log(axisConfig);
        return {
            axis: this.props.channel,
            count: counts,
            analogFeedbackSelect: axisConfig["InterpolationCounts"],
            brushlessModulus: axisConfig["BrushlessModulus"],
            brushlessZeroVolts: axisConfig["BrushlessZeroVolts"],
            homingJogSpeed: axisConfig["HomingJogSpeed"],
            axisType: axisConfig["AxisType"],
            homingMethod: axisConfig["HomingMethod"],
            axisLimitHigh: axisConfig["AxisLimitHigh"],
            axisLimitLow: axisConfig["AxisLimitLow"]

        }
    }

    handlePositionMethodChange(event) {
        this.setState({positionMethod: event.target.value});
    }

    handlePositionCountsChange(event) {
        this.setState({positionCounts: event.target.value});
    }

    render() {

        var result = null
        if (this.props.telemetry && this.props.telemetry.axes) {
            result = this.props.telemetry.axes.find(x => x.axis == this.props.channel)
        }

        return (

            <tr>
                <td>{this.props.channel}</td>
                <td>{result ? result.status : 'Unknown'}</td>
                <td>{result ? result.position : 'Unknown'}</td>
                <td>{result ? result.positionError : 'Unknown'}</td>


                <td>
                    <select className="form-control" value={this.state.positionMethod} onChange={this.handlePositionMethodChange}>
                        <option value="positionAbsolute">positionAbsolute</option>
                        <option value="positionRelative">positionRelative</option>
                    </select>
                </td>


                <td>
                    <input type="text" className="form-control"value={this.state.positionCounts} size="2" onChange={this.handlePositionCountsChange}></input>
                </td>


                <td><button type="button" className="btn btn-primary" onClick={() => this.sendPositionCommand()}>Submit</button></td>


                <td><button type="button" className="btn btn-primary" onClick={() => this.sendStopCommand()}>Stop</button></td>

                <td><button type="button" className="btn btn-primary" onClick={() => this.sendInitCommand()}>Init</button></td>

                <td><button type="button" className="btn btn-primary" onClick={() => this.sendHomeCommand()}>Home</button></td>

            </tr>

        );
    }



    getAxisConfigProps() {
        if (this.props.hcdConfigs.axes) {
            var testObj = this.nameValueArrayToObject(this.props.hcdConfigs.axes[this.props.channel].props)
            console.log(testObj)
            return testObj;
        }

    }

    nameValueArrayToObject(arr) {
        var obj = {};
        arr.forEach(function(data){
           obj[data.name] = data.value
        });
        return obj;
    }

}

function mapStateToProps(state) {

    console.log("HCD CHANNEL LIST ITEM: ")
    console.log(state.hcdConfigs)

    return {
         hcdConfigs: state.hcdConfigs,
        telemetry: state.telemetry
    }


}

export default connect(mapStateToProps, null)(HcdChannelListItem);
