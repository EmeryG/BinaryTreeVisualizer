import React from 'react';
import Line from './Line';
import NodeComponent from './Node';
import { BinaryTree, Node } from './BinaryTree';
import './Tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start", treeGeneration: (<div></div>)};

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
        var binaryTree = new BinaryTree(7);

        for(let i = 0; i < 32; i++) {
            binaryTree.addNode(Math.round(Math.random()*60));
        }

        var nodeJSXMap = binaryTree.getNodeJSXHashmap();

        var treeJSX = this.concatNodeJSXHashmap(nodeJSXMap);
        
        this.setState({ treeGeneration: treeJSX });
    }

    concatNodeJSXHashmap(nodeJSXMap) {
        var nodeJSXArray = Array.from(nodeJSXMap.values());

        return (
            <div>
                {nodeJSXArray.map((row, rowNum) => 
                    this.treeRowFromNodeJSX(row, "treerow-" + rowNum)
                )}
            </div>
        );
    }

    treeRowFromNodeJSX(nodeArray, rowId="") {
        return (
            <div key={rowId} className="treerow">
                {nodeArray}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <button id="Control" onClick={this.generateTree}>
                        { this.state.buttonMessage }
                    </button>
                </div>

                {this.state.treeGeneration}
            </div>
        );
    }
}