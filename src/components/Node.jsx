import React from 'react';

// uses props.char
export default class Node extends React.Component {
    render() {
        return (
            <span><h1>{this.props.char}</h1></span>
        )
    }
}