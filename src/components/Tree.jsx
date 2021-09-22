import React from 'react';
import Line from './Line';
import Node from './Node';
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
            <div>
                <div>
                    <button id="Control" onClick={this.startAnimation}>
                        { this.state.buttonMessage }
                    </button>
                </div>

                <div className="treerow">
                    <Node id="node1" char="A"/>
                </div>
                    <Line id_1="node1" id_2="node2" />
                    <Line id_1="node1" id_2="node3" />
                <div className="treerow">
                    <Node id="node2" char="B"/>
                    <Node id="node3" char="C"/>
                </div>
            </div>
        );
    }
}