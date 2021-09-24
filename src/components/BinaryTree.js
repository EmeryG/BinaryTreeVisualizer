import NodeComponent from './Node';

class Node {
    constructor(value, parent=null, left=null, right=null) { 
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    getNodeComponent() {
        return (<NodeComponent value={this.value}/>);
    }
}

export default class BinaryTree {
    constructor(maxHeight) {
        this._root = null;
        this.maxHeight = maxHeight;
    }

    addNode(value) {
        // if root is null, root becomes first node
        this._root = this.add(value, this._root);
    }

    add(value, selected, parent=null, height=1) {
        if(selected === null) return new Node(value, parent);

        if(height+1 > this.maxHeight) {
            return selected;
        }

        if(value < selected.value) {
            selected.left = this.add(value, selected.left, selected, height+1);
        } else if (value > selected.value) {
            selected.right = this.add(value, selected.right, selected, height+1);
        }

        return selected;
    }

    // Returns entire tree's nodes in a hashmap. Keys are heights, values are list objects with Node JSX
    getNodeJSXHashmap(selected = null, map = null, height=1) {
        if(map === null) {
            map = new Map();
            selected = this._root;
        } else if(selected === null) {
            return;
        }

        // If key exists, add one to existing array list
        if(map.has(height)) {
            map.get(height).push(selected.getNodeComponent);
        } else {
            map.set(height, [ selected.getNodeComponent() ]);
        }
        
        this.getNodeJSXHashmap(selected.left, map, height+1);
        this.getNodeJSXHashmap(selected.right, map, height+1);

        return map;
    }
}