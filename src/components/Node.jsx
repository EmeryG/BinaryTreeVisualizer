import React from 'react';

// uses props.char
export default class NodeComponent extends React.Component {
    render() {
        return (
            <div key={this.props.value} ><h1>{this.props.value}</h1></div>
        )
    }
}