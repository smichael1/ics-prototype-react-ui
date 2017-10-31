'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

const data =
    {

        name: 'ICS Prototype',
        toggled: true,
        children:
            [
                {
                    name: 'Dashboard'
                },
                {
                    name: 'Assembly Control',
                    toggled: true,
                    children: [
                        {name: 'Pupil Stage Assembly'},
                        {name: 'Fiber Source Assembly'},
                        {name: 'DM Optic Assembly'}
                    ]
                },
                {
                    name: 'HCD Control',
                    children: [
                        {
                            name: 'Galil HCD',
                            children: [
                                {name: 'Channel A'},
                                {name: 'Channel B'},
                                {name: 'Channel C'},
                                {name: 'Channel D'},
                                {name: 'Channel E'},
                                {name: 'Channel F'},
                                {name: 'Channel G'},
                                {name: 'Channel H'}
                            ]
                        }
                    ]
                },
                {
                    name: 'Utilities',
                    toggled: true,
                    children: [
                        {name: 'Logging'},
                        {
                            name: 'Configuration',
                            toggled: true,
                            children: [
                                {
                                    name: 'Pupil Stage Assembly',
                                    children: [
                                        {name: 'Stimulus Pupil X'},
                                        {name: 'Stimulus Pupil Y'},
                                        {name: 'Stimulus Pupil Phi'}
                                    ]

                                },
                                {
                                    name: 'Fiber Source Assembly',
                                    children: [
                                        {name: 'Fiber Source X'},
                                        {name: 'Fiber Source Y'},
                                        {name: 'Fiber Source Z'}
                                    ]

                                },
                                {
                                    name: 'DM Optic Assembly'
                                },
                                {name: 'Galil HCD'}
                            ]
                        }

                    ]
                },

            ]
    };

const style =  {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#888888',
            margin: 5,
            padding: 5,
            color: '#000000',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                backgroundColor: '#cccccc',
                color: '#ffffff'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#444444',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#000000'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};

class TreeExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
                style={style}
            />
        );
    }
}

export default TreeExample