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

        var treeJSXHashmap = binaryTree.getNodeJSXHashmap();

        var treeJSX = this.compileJSXHashmap(treeJSXHashmap);

        console.log(treeJSX);
        
        this.setState({ treeGeneration: treeJSX });
    }

    compileJSXHashmap(binaryTree) {
        var JSXRows = [];

        for(var row of binaryTree.values()) {
            JSXRows.push(this.compileJSXArray(row));
        }

        return (
            <div>
                testing2
                {JSXRows.reduce((row1, row2) => {
                    return (<div>{row1}</div>);
                })}
            </div>
        );
    }

    compileJSXArray(row) {
        return (
            <div className="treeRow">
                {row.reduce((item1, item2) => item1+item)}
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