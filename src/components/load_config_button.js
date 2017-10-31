/**
 * Created by smichaels on 7/6/17.
 */
import React, {Component} from 'react';
import {fetchConfig} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class LoadConfigButton extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        console.log(this.props.configFile);

        this.props.fetchConfig(this.props.configFile);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group pull-left">
                <button type="submit" className="btn btn-primary">Load</button>
            </form>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchConfig}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoadConfigButton);