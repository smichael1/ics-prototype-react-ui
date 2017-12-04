import React, { Component } from 'react';

class Tab extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.tabIndex);
    }

    render() {
        return (
            <li className={`${this.props.isActive ? 'active' : ''}`}>
                <a onClick={this.handleTabClick} href="#">
                    <span className={this.props.iconClassName}></span> {this.props.linkName}
                </a>
            </li>
        );
    }
}

Tab.propTypes = {
    onClick      : React.PropTypes.func,
    tabIndex     : React.PropTypes.number,
    isActive     : React.PropTypes.bool,
    iconClassName: React.PropTypes.string.isRequired,
    linkName: React.PropTypes.string.isRequired
};

export default Tab;