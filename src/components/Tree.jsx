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
        var binaryTree = new BinaryTree(6);

        for(let i = 0; i < 32; i++) {
            binaryTree.addNode(Math.round(Math.random()*60));
        }

        var treeHashmap = binaryTree.getJSXHashmap();

        var treeJSX = this.treeHashmapToJSX(treeHashmap);
        
        this.setState({ treeGeneration: treeJSX });
    }

    treeHashmapToJSX(treeHashmap) {
        var treeRowArray = Array.from(treeHashmap.values());

        treeRowArray.sort(this.arrayLengthCompare);

        return (
            <div>
                {treeRowArray.map((treeRow, index) => 
                    this.treeRowToJSX(treeRow, index+1)
                )}
            </div>
        );
    }

    treeRowToJSX(nodeArray, rowNum) {
        return (
            <div key={"treerow-" + rowNum} className="treerow">
                {nodeArray}
            </div>
        );
    }

    arrayLengthCompare(a, b) {
        if(a.length > b.length) {
            return 1;
        } else if (a.length < b.length) {
            return -1;
        }

        return 0;
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