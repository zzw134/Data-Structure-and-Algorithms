// 节点类
class TreeNode {
  val: any;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: any) {
    this.val = val;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;
  insert(val: any) {
    const node = new TreeNode(val);
    if (!this.root) {
      // 如果根节点为空，直接当成根节点插入
      this.root = node;
    } else {
      this.#insertNode(this.root, node);
    }
  }
  #insertNode(n1: TreeNode, n2: TreeNode) {
    if (n2.val < n1.val) {
      if (n1.left) {
        this.#insertNode(n1.left, n2);
      } else {
        n1.left = n2;
      }
    } else {
      if (n1.right) {
        this.#insertNode(n1.right, n2);
      } else {
        n1.right = n2;
      }
    }
  }

  search(val: any): boolean {
    return this.#searchNode(this.root, val);
  }
  #searchNode(n: TreeNode | null, val: any): boolean {
    if (n) {
      if (val < n.val) {
        return this.#searchNode(n.left, val);
      } else if (val > n.val) {
        return this.#searchNode(n.right, val);
      } else {
        return true;
      }
    }
    return false;
  }

  // 先序遍历
  preorderTraversal(handler: (val: any) => any) {
    this.#traversal("preorder", this.root, handler);
  }

  // 中序遍历
  inorderTraversal(handler: (val: any) => any) {
    this.#traversal("inorder", this.root, handler);
  }

  // 后序遍历
  postorderTraversal(handler: (val: any) => any) {
    this.#traversal("postorder", this.root, handler);
  }

  #traversal(
    order: "preorder" | "inorder" | "postorder",
    node: TreeNode | null,
    handler: (val: any) => any
  ) {
    if (node) {
      switch (order) {
        case "preorder":
          handler(node.val);
          this.#traversal("preorder", node.left, handler);
          this.#traversal("preorder", node.right, handler);
          break;
        case "inorder":
          this.#traversal("inorder", node.left, handler);
          handler(node.val);
          this.#traversal("inorder", node.right, handler);
          break;
        case "postorder":
          this.#traversal("postorder", node.left, handler);
          this.#traversal("postorder", node.right, handler);
          handler(node.val);
          break;
      }
    }
  }

  min(): any {
    let node = this.root;
    while (node?.left) {
      node = node.left;
    }
    return node?.val;
  }

  max(): any {
    let node = this.root;
    while (node?.right) {
      node = node.right;
    }
    return node?.val;
  }

  // 删除
  remove(val: any) {
    let current: TreeNode | null = this.root; // 用于保存当前节点
    let parent: TreeNode | null = null; // 当前节点的父节点，
    let isLeftChild: boolean = true; // 当前节点是否是父节点的左节点

    // 先找出要删除的节点
    while (current && current.val !== val) {
      parent = current;
      if (val < current.val) {
        current = current.left;
        isLeftChild = true;
      } else {
        current = current.right;
        isLeftChild = false;
      }
    }

    if (!current) {
      return false;
    }

    if (!current.left && !current.right) {
      // 当前节点为叶子节点的情况
      if (current === this.root) {
        this.root = null;
      } else {
        if (isLeftChild) {
          parent!.left = null;
        } else {
          parent!.right = null;
        }
      }
    } else if (!current.left) {
      // 当前节点的左子节点为空的情况
      if (current === this.root) {
        this.root = current.right;
      } else {
        if (isLeftChild) {
          parent!.left = current.right;
        } else {
          parent!.right = current.right;
        }
      }
    } else if (!current.right) {
      // 当前节点的右子节点为空的情况
      if (current === this.root) {
        this.root = current.left;
      } else {
        if (isLeftChild) {
          parent!.left = current.left;
        } else {
          parent!.right = current.left;
        }
      }
    } else {
      // 当前节点的度为2的情况
      const successor = this.#getSuccessor(current);
      successor!.left = current.left;
      if (current === this.root) {
        this.root = successor;
      } else {
        if (isLeftChild) {
          parent!.left = successor;
        } else {
          parent!.right = successor;
        }
      }
    }
  }

  // 寻找要删除节点的后继节点
  #getSuccessor(delNode: TreeNode) {
    let successorParent: TreeNode | null = delNode;
    let current = delNode.right;
    let successor: TreeNode | null = current;
    while (current) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    if (successor !== delNode.right) {
      successorParent!.left = successor!.right;
      successor!.right = delNode.right;
    }

    return successor;
  }
}

// 测试代码
var bst = new BinarySearchTree();

// 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);

console.log(bst.search(1));
console.log(bst.search(13));
console.log(bst.min());
console.log(bst.max());

let arr: any[] = [];
bst.preorderTraversal((val) => {
  arr.push(val);
});
console.log(arr);

let arr2: any[] = [];
bst.inorderTraversal((val) => {
  arr2.push(val);
});
console.log(arr2);

let arr3: any[] = [];
bst.postorderTraversal((val) => {
  arr3.push(val);
});
console.log(arr3);

bst.remove(15);
let arr4: any[] = [];
bst.inorderTraversal((val) => {
  arr4.push(val);
});
console.log("-------------");

console.log(arr4);
