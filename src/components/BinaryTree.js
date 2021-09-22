class Node {
    constructor(value, parent=null, left=null, right=null) { 
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

export default class BinaryTree {
    constructor(maxHeight) {
        this._root = null;
        this.maxHeight = maxHeight;
    }

    addNode(value) {
        // if root is null, root becomes first node
        this._root = this.add(value, this.root);
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
}