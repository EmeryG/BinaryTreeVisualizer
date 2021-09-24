import React from 'react';
import Line from './Line';
import NodeComponent from './Node';
import BinaryTree from './BinaryTree';
import './Tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { buttonMessage : "Start", treeGeneration: (<div>test</div>)};

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

        var binaryTreeMap = binaryTree.getNodeHashmap();

        var treeJSX = this.binaryTreeHashmapToJSX(binaryTreeMap);
        
        this.setState({ treeGeneration: treeJSX });
    }

    binaryTreeHashmapToJSX(binaryTreeMap) {
        var treeRows = Array.from(binaryTreeMap);

        return (
            <div>
                {treeRows.map((row, rowNum) => 
                    this.nodeArrayToJSX(row, "treerow-" + rowNum)
                )}
            </div>
        );
    }

    nodeArrayToJSX(nodeArray, rowId="") {
        return (
            <div id={rowId} className="treeRow">
                    {nodeArray.map((node, i) => { return node.getNodeComponent() })}
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