import React from 'react';
import Line from './Line'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start"};

        this.startAnimation = this.startAnimation.bind(this); 
        this.createLine = this.createLine.bind(this);
        this.line = (<div></div>);
    }
    

    startAnimation() {
        if (this.state.buttonMessage === "Start") {
            this.setState({ buttonMessage: "Randomize"});
            this.forceUpdate();
        } else {

        }
    }
   
    createLine() {
        this.line = (<Line id_1="Control" id_2="Test" />);
    }

    render() {
        return (
            <div>
                <button id="Control" onClick={this.startAnimation}>
                { this.state.buttonMessage }
                </button>
                <br/>
                <br/>
                <button id="Test" onClick={this.createLine}>
                    Create Line
                </button> 
                {this.line}
            </div>
        );
    }
}