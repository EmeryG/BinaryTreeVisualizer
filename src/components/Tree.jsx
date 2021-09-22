import React from 'react';
import Line from './Line';
import Node from './Node';
import BinaryTree from './BinaryTree';
import './Tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start"};

        this.binarytree = null;
        this.startAnimation = this.startAnimation.bind(this);
        this.generateTree = this.generateTree.bind(this); 
    }
    

    startAnimation() {
        if (this.state.buttonMessage === "Start") {
            this.setState({ buttonMessage: "Randomize"});
        } else {

        }
    }
   
    generateTree() {
        let treeJSX;

        let rowJSX = [(
            <div className="treerow">
                <Node id="node1" char="A"/>
            </div>
        )];

        var binaryTree = new BinaryTree(7);

        for(let i = 0; i < 32; i++) {
            binaryTree.add(Math.round(Math.random()*60));
        }
    }

    generateRow() {

    }

    render() {
        return (
            <div>
                <div>
                    <button id="Control" onClick={this.generateTree}>
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
                    <Line id_1="node2" id_2="node4" />
                    <Line id_1="node2" id_2="node5" />
                    <Line id_1="node3" id_2="node6" />
                    <Line id_1="node3" id_2="node7" />
                <div className="treerow">
                    <Node id="node4" char="B"/>
                    <Node id="node5" char="C"/>
                    <Node id="node6" char="D"/>
                    <Node id="node7" char="E"/>
                </div>
            </div>
        );
    }
}