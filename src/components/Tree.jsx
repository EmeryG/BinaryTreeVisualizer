import React from 'react';
import Line from './Line';
import './Tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start"};

        this.startAnimation = this.startAnimation.bind(this); 
    }
    

    startAnimation() {
        if (this.state.buttonMessage === "Start") {
            this.setState({ buttonMessage: "Randomize"});
        } else {

        }
    }
   

    render() {
        return (
            <div class="tree">
                <div class="treerow">
                    <button id="Control" onClick={this.startAnimation}>
                        { this.state.buttonMessage }
                    </button>
                </div>
                <Line id_1="Control" id_2="Test" />
                <div class="treerow">
                    <p>test</p>
                    <p>test2</p>
                    <button id="Test">
                        Create Line
                    </button> 
                </div>
            </div>
        );
    }
}