import React from 'react';

// uses props.char
export default class NodeComponent extends React.Component {
    render() {
        return (
            <span id={"node-" + this.props.value}><h1>{this.props.value}</h1></span>
        )
    }
}