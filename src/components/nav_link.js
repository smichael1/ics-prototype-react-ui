import React, { Component } from 'react';

class NavLink extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.linkName, this.props.panelType);
    }

    render() {
        const isActive = this.props.linkName === this.props.activeLinkName;
        return (
            <li className={`${isActive ? 'active' : ''}`}>
                <a onClick={this.handleTabClick} href="#">
                    <span className={this.props.iconClassName}></span> {this.props.linkName}
                </a>
            </li>
        );
    }
}

NavLink.propTypes = {
    onClick      : React.PropTypes.func,
    activeLinkName     : React.PropTypes.string.isRequired,
    isActive     : React.PropTypes.bool,
    iconClassName: React.PropTypes.string.isRequired,
    linkName: React.PropTypes.string.isRequired
};

export default NavLink;