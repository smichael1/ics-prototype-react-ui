/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import HcdChannelListItem from './hcd_channel_list_item';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';

class HcdChannelList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }



    renderList() {

        return (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']).map((axis) => {

            return (
                <HcdChannelListItem key={axis} channel={axis}
                                 status='good'
                                 position='100'
                                 positionError='100'
                                 positionCommand='positionAbsolute'
                                 positionCounts='30'
                                    updateStatusHistory={this.props.updateStatusHistory.bind(this)} />
            );

        });
    }

    render() {


    return (



        <form className="form-horizonal">
            <div class="table-responsive">
            <table className="table table-bordered table-striped table-highlight">
                <thead>
                <tr>
                    <th>Channel</th>
                    <th>Status</th>
                    <th>Position</th>
                    <th>Position Error</th>
                    <th>Position Cmd</th>
                    <th>Value</th>
                    <th> </th>
                    <th> </th>
                    <th> </th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {this.renderList()}
                </tbody>
            </table>
            </div>


        </form>
    );
    }

}

function mapStateToProps(state) {
    return {
        commands: state.commands,
        commandStatus: state.commandStatus
    }
}

export default connect(mapStateToProps)(HcdChannelList);