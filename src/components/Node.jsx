import React from 'react';

// uses props.char
export default class Node extends React.Component {
    render() {
        return (
            <span id={this.props.id}><h1>{this.props.char}</h1></span>
        )
    }
}