import NodeComponent from './Node';
import Line from './Line';

class Node {
    constructor(value, parent=null, left=null, right=null) { 
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    getNodeComponent() {
        if(this.parent != null) {
            return (<span>
                <NodeComponent key={this.value} id={this.value} value={this.value}/>
                <Line id_1={ "node-" + this.value} id_2={ "node-" + this.parent.value} />
            </span>);
        } else {
            return <NodeComponent key={this.value} id={this.value} value={this.value}/>
        }
    }
}

class BinaryTree {
    constructor(maxHeight) {
        this._root = null;
        this.maxHeight = maxHeight;
    }

    addNode(value) {
        // if root is null, root becomes first node
        this._root = this._add(value, this._root);
    }

    _add(value, selected, parent=null, height=1) {
        if(selected === null) return new Node(value, parent);

        if(height+1 > this.maxHeight) {
            return selected;
        }

        if(value < selected.value) {
            selected.left = this._add(value, selected.left, selected, height+1);
        } else if (value > selected.value) {
            selected.right = this._add(value, selected.right, selected, height+1);
        }

        return selected;
    }

    // Returns entire tree to a hashmap of nodes in JSX format. Keys are heights, values are list objects with Node JSX.
    getJSXHashmap(fillBlanks=true) {
        var map = new Map();
        map.set(1, this._root.getNodeComponent());

        this._moveJSXtoMap(this._root, map, 1, fillBlanks);

        return map;
    }

    // Assigns arrays of JSX to a provided hashmap object
    _moveJSXtoMap(selected, map, height, fillBlanks) {
        if(selected === null) {
            if(fillBlanks) { 
                return <h1 class="blank">00</h1> 
            } else {
                return null;
            }
        }

        var leftJSX = this._moveJSXtoMap(selected.left, map, height+1, fillBlanks);
        var rightJSX = this._moveJSXtoMap(selected.right, map, height+1, fillBlanks);

        var arrayJSX = [];
        
        if(leftJSX != null) arrayJSX.push(leftJSX);
        if(rightJSX != null) arrayJSX.push(rightJSX);

        if(map.has(height+1)) {
            map.get(height+1).push(...arrayJSX);
        } else if(arrayJSX.length > 0) {
            map.set(height+1, [ arrayJSX ]);
        }

        return selected.getNodeComponent();
    }
}

export {
    Node,
    BinaryTree
}