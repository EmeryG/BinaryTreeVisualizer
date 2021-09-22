class Node {
    constructor(value, parent=null, left=null, right=null) { 
        var _value = this.convertValue(value);
        var _parent = parent;
        var _left = left;
        var _right = right;

        this.setValue = function(newValue) {_value = this.convertValue(newValue); }
        this.getCharValue = function() { return _value; }
        this.getValue = function() { return String.fromCharCode(_value); }
        
        this.setParent = function(parent) { _parent = parent; }
        this.getParent = function() { return _parent; }

        this.setLeft = function(leftNode) { _left = leftNode; };
        this.getLeft = function() { return _left; }
        
        this.setRight = function(rightNode) { _right = rightNode; }
        this.getRight = function() { return _right; }
    }

    convertValue(value) {
        if(value === parseInt(value)) {
            return value.toString().charCodeAt(0);
        } else {
            return value.charCodeAt(0);
        }
    }
}

export default class BinaryTree {
    constructor(maxHeight) {
        this.root = null;
        this.maxHeight = maxHeight;
    }

    addNode(value) {
        // if root is null, root becomes first node
        this.root = this.add(value, this.root);
    }

    add(value, selected, parent=null, height=1) {
        if(selected === null) return new Node(value, parent);

        if(height+1 > this.maxHeight) {
            return selected;
        }

        if(value < selected.getCharValue()) {
            selected.left = this.add(value, selected.left, selected, height+1);
        } else if (value > selected.getCharValue()) {
            selected.right = this.add(value, selected.right, selected, height+1);
        }

        return selected;
    }
}