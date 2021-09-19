import React from 'react';
import Line from './Line';
import './Tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start", line: (<div style={{position: "absolute"}}></div>)};

        this.startAnimation = this.startAnimation.bind(this); 
        this.createLine = this.createLine.bind(this);
    }
    

    startAnimation() {
        if (this.state.buttonMessage === "Start") {
            this.setState({ buttonMessage: "Randomize"});
            this.forceUpdate();
        } else {

        }
    }
   
    createLine() {
        this.setState({line: (<Line id_1="Control" id_2="Test" />)})
    }

    render() {
        return (
            <div class="tree">
                <div class="treerow">
                    <button id="Control" onClick={this.startAnimation}>
                        { this.state.buttonMessage }
                    </button>
                </div>
                {this.state.line}
                <div class="treerow">
                    <p>test</p>
                    <p>test2</p>
                    <button id="Test" onClick={this.createLine}>
                        Create Line
                    </button> 
                </div>
            </div>
        );
    }
}