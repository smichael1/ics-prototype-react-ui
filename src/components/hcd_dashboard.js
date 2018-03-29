import React, { Component } from 'react';
import HcdChannelList from './hcd_channel_list';



class HcdDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {statusHistory: ''};
    }


    updateStatusHistory(newStatus) {

        const newStatusHistory = this.state.statusHistory + "\n" + newStatus

        console.log(newStatusHistory)

        this.setState(
            {statusHistory: newStatusHistory}
        )
    }

    render() {

        return (

            <div>
            <h2>HCD Dashboard</h2>


                <h3>Channel Status and Command</h3>
                <HcdChannelList updateStatusHistory={this.updateStatusHistory.bind(this)}/>


                <h3>Command Status History</h3>

                <div class="form-group">
                    <textarea readOnly class="form-control" rows="10" id="comment" style={{width: '70%'}} value={this.state.statusHistory}>
                    </textarea>
                </div>

            </div>
        );
    }
}

export default HcdDashboard;