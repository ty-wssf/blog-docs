# 二叉平衡树（AVL树）

## 1. 平衡二叉树定义
> 平衡二叉树又称AVL树。它可以是一颗空树，或者具有以下性质的二叉排序树：它的左子树和右子树的高度之差(平衡因子)的绝对值不超过1且它的左子树和右子树都是一颗平衡二叉树。
- 平衡二叉树又称AVL树
- 平衡二叉树必须是二叉排序树
- 每个节点的左子树和右子树的高度差至多为1。

在定义中提到了树的高度和深度，我敢肯定有很多读者一定对树的高度和深度有所误解！最可爱的误解就是树的高度和深度没有区别，认为树的高度就是深度。宜春就忍不了了，必须得哔哔几句...
树的高度和深度本质区别：深度是从根节点数到它的叶节点，高度是从叶节点数到它的根节点。

在定义中提到了树的高度和深度，我敢肯定有很多读者一定对树的高度和深度有所误解！最可爱的误解就是树的高度和深度没有区别，认为树的高度就是深度。宜春就忍不了了，必须得哔哔几句...
树的高度和深度本质区别：深度是从根节点数到它的叶节点，高度是从叶节点数到它的根节点。

> 二叉树的深度是从根节点开始自顶向下逐层累加的；而二叉树高度是从叶节点开始自底向上逐层累加的。虽然树的深度和高度一样，但是具体到树的某个节点，其深度和高度是不一样的。

其次就是对树的高度和深度是从1数起，还是从0数起。当然我也有自己的答案，但是众说纷纭，博主就不说其对与错了，就不多哔哔了。但是我还是比较认同这张图的观点：

![](https://user-gold-cdn.xitu.io/2019/12/14/16f03f6df4598e71?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 2. 这货还是不是平衡二叉树？
判断一棵平衡二叉树（AVL树）有如下必要条件：
> 条件一：必须是二叉搜索树。 条件二：每个节点的左子树和右子树的高度差至多为1。

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df54a3ae6~tplv-t2oaga2asx-watermark.png)
![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df53b4b33~tplv-t2oaga2asx-watermark.png)

## 3. 平衡因子
不多哔哔，平衡因子 = 左子树深度/高度 - 右子树深度/高度

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df732a875~tplv-t2oaga2asx-watermark.awebp)

对于上图平衡二叉树而言：
5的结点平衡因子就是 3 - 2 = 1；
2的结点平衡因子就是 1 - 2 = -1；
4的结点平衡因子就是 1 - 0 = 1；
6的结点平衡因子就是 0 - 1 = -1；

对于上图非平衡二叉树而言：
3 的结点平衡因子就是 2 - 4 = -2；
1 的结点平衡因子就是 0 - 1 = -1；
4 的结点平衡因子就是 0 - 3 = -3；
5 的结点平衡因子就是 0 - 2 = -2；
6 的结点平衡因子就是 0 - 1 = -1；

**特别注意：叶子结点平衡因子都是为 0**

## 4. 如何保持平衡二叉树平衡？
由于普通的二叉查找树会容易失去”平衡“，极端情况下，二叉查找树会退化成线性的链表，导致插入和查找的复杂度下降到 O(n) ，所以，这也是平衡二叉树设计的初衷。那么平衡二叉树如何保持”平衡“呢？

不难看出平衡二叉树是一棵高度平衡的二叉查找树。所以，要构建跟维系一棵平衡二叉树就比普通的二叉树要复杂的多。在构建一棵平衡二叉树的过程中，当有新的节点要插入时，检查是否因插入后而破坏了树的平衡，如果是，则需要做旋转去改变树的结构。关于旋转，我相信使用文字描述是很难表达清楚的，还是得靠经典的两个图来理解最好不过了！不要不信噢，当然你可以尝试读下文字描述左旋：

>左旋简单来说就是将节点的右支往左拉，右子节点变成父节点，并把晋升之后多余的左子节点出让给降级节点的右子节点。

相信你已经晕了。当然可以试着看看下面的经典动图理解！

左旋：

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df54a4697~tplv-t2oaga2asx-watermark.png)

==试着用动态和下面的左旋结果图分析分析，想象一下，估计分分钟明白左旋！！！==

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df625d203~tplv-t2oaga2asx-watermark.png)
```
//左旋转方法代码
private void leftRotate() {
    //创建新的结点，以当前根结点的值
    Node newNode = new Node(value);
    //把新的结点的左子树设置成当前结点的左子树
    newNode.left = left;
    //把新的结点的右子树设置成带你过去结点的右子树的左子树
    newNode.right = right.left;
    //把当前结点的值替换成右子结点的值
    value = right.value;
    //把当前结点的右子树设置成当前结点右子树的右子树
    right = right.right;
    //把当前结点的左子树(左子结点)设置成新的结点
    left = newNode;
}
```

相应的右旋就很好理解了：

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df55fc125~tplv-t2oaga2asx-watermark.png)

反之就是右旋，这里就不再举例了！

小结：当二叉排序树每个节点的左子树和右子树的高度差超过1的时候，就需要通过旋转节点来维持平衡！旋转又分为左旋、右旋、双旋转。

啥？双旋转？是的，顾名思义，在一些添加节点的情况下旋转一次是不能达到平衡的，需要进行第二次旋转，

## 5. 平衡二叉树插入节点的四种情况    
当新节点插入后，有可能会有导致树不平衡，而可能出现的情况就有4种，分别称作**左左，左右，右左，右右。**

==而所谓的“左”和“右”无非就是代表新节点所插入的位置是左还是右！==

>第一个左右代表位于根节点的左或者右， 第二个左右代表位于 【最接近插入节点的拥有两个子节点的父节点】 位置的左或者右

下面以左左为例，分析一波：

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df77d3362~tplv-t2oaga2asx-watermark.png)

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/16f03f6df76fae10~tplv-t2oaga2asx-watermark.awebp)

其中要特别注意的是：

>右右、左左只需要旋转一次就可以平衡。 左右、右左要旋转两次才能把树调整平衡！

==其中旋转的条件就是：当二叉排序树每个节点的左子树和右子树的高度差超过1的时候！==

## 6. 平衡二叉树操作的代码实现
```java
// 创建AVLTree
class AVLTree {
    private Node root;

    public Node getRoot() {
        return root;
    }

    // 查找要删除的结点
    public Node search(int value) {
        if (root == null) {
            return null;
        } else {
            return root.search(value);
        }
    }

    // 查找父结点
    public Node searchParent(int value) {
        if (root == null) {
            return null;
        } else {
            return root.searchParent(value);
        }
    }

    // 编写方法:
    // 1. 返回的 以node 为根结点的二叉排序树的最小结点的值
    // 2. 删除node 为根结点的二叉排序树的最小结点
    /**
     *
     * @param node 传入的结点(当做二叉排序树的根结点)
     *            
     * @return 返回的 以node 为根结点的二叉排序树的最小结点的值
     */
    public int delRightTreeMin(Node node) {
        Node target = node;
        // 循环的查找左子节点，就会找到最小值
        while (target.left != null) {
            target = target.left;
        }
        // 这时 target就指向了最小结点
        // 删除最小结点
        delNode(target.value);
        return target.value;
    }

    // 删除结点
    public void delNode(int value) {
        if (root == null) {
            return;
        } else {
            // 1.需求先去找到要删除的结点 targetNode
            Node targetNode = search(value);
            // 如果没有找到要删除的结点
            if (targetNode == null) {
                return;
            }
            // 如果我们发现当前这颗二叉排序树只有一个结点
            if (root.left == null && root.right == null) {
                root = null;
                return;
            }

            // 去找到targetNode的父结点
            Node parent = searchParent(value);
            // 如果要删除的结点是叶子结点
            if (targetNode.left == null && targetNode.right == null) {
                // 判断targetNode 是父结点的左子结点，还是右子结点
                if (parent.left != null && parent.left.value == value) { // 是左子结点
                    parent.left = null;
                } else if (parent.right != null && parent.right.value == value) {// 是由子结点
                    parent.right = null;
                }
            } else if (targetNode.left != null && targetNode.right != null) { // 删除有两颗子树的节点
                int minVal = delRightTreeMin(targetNode.right);
                targetNode.value = minVal;

            } else { // 删除只有一颗子树的结点
                // 如果要删除的结点有左子结点
                if (targetNode.left != null) {
                    if (parent != null) {
                        // 如果 targetNode 是 parent 的左子结点
                        if (parent.left.value == value) {
                            parent.left = targetNode.left;
                        } else { // targetNode 是 parent 的右子结点
                            parent.right = targetNode.left;
                        }
                    } else {
                        root = targetNode.left;
                    }
                } else { // 如果要删除的结点有右子结点
                    if (parent != null) {
                        // 如果 targetNode 是 parent 的左子结点
                        if (parent.left.value == value) {
                            parent.left = targetNode.right;
                        } else { // 如果 targetNode 是 parent 的右子结点
                            parent.right = targetNode.right;
                        }
                    } else {
                        root = targetNode.right;
                    }
                }

            }

        }
    }

    // 添加结点的方法
    public void add(Node node) {
        if (root == null) {
            root = node;// 如果root为空则直接让root指向node
        } else {
            root.add(node);
        }
    }

    // 中序遍历
    public void infixOrder() {
        if (root != null) {
            root.infixOrder();
        } else {
            System.out.println("二叉排序树为空，不能遍历");
        }
    }
}

// 创建Node结点
class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {

        this.value = value;
    }

    // 返回左子树的高度
    public int leftHeight() {
        if (left == null) {
            return 0;
        }
        return left.height();
    }

    // 返回右子树的高度
    public int rightHeight() {
        if (right == null) {
            return 0;
        }
        return right.height();
    }

    // 返回 以该结点为根结点的树的高度
    public int height() {
        return Math.max(left == null ? 0 : left.height(), right == null ? 0 : right.height()) + 1;
    }

    //左旋转方法
    private void leftRotate() {

        //创建新的结点，以当前根结点的值
        Node newNode = new Node(value);
        //把新的结点的左子树设置成当前结点的左子树
        newNode.left = left;
        //把新的结点的右子树设置成带你过去结点的右子树的左子树
        newNode.right = right.left;
        //把当前结点的值替换成右子结点的值
        value = right.value;
        //把当前结点的右子树设置成当前结点右子树的右子树
        right = right.right;
        //把当前结点的左子树(左子结点)设置成新的结点
        left = newNode;


    }

    //右旋转
    private void rightRotate() {
        Node newNode = new Node(value);
        newNode.right = right;
        newNode.left = left.right;
        value = left.value;
        left = left.left;
        right = newNode;
    }

    // 查找要删除的结点
    /**
     *
     * @param value
     *            希望删除的结点的值
     * @return 如果找到返回该结点，否则返回null
     */
    public Node search(int value) {
        if (value == this.value) { // 找到就是该结点
            return this;
        } else if (value < this.value) {// 如果查找的值小于当前结点，向左子树递归查找
            // 如果左子结点为空
            if (this.left == null) {
                return null;
            }
            return this.left.search(value);
        } else { // 如果查找的值不小于当前结点，向右子树递归查找
            if (this.right == null) {
                return null;
            }
            return this.right.search(value);
        }

    }

    // 查找要删除结点的父结点
    /**
     *
     * @param value 要找到的结点的值
     *            
     * @return 返回的是要删除的结点的父结点，如果没有就返回null
     */
    public Node searchParent(int value) {
        // 如果当前结点就是要删除的结点的父结点，就返回
        if ((this.left != null && this.left.value == value) || (this.right != null && this.right.value == value)) {
            return this;
        } else {
            // 如果查找的值小于当前结点的值, 并且当前结点的左子结点不为空
            if (value < this.value && this.left != null) {
                return this.left.searchParent(value); // 向左子树递归查找
            } else if (value >= this.value && this.right != null) {
                return this.right.searchParent(value); // 向右子树递归查找
            } else {
                return null; // 没有找到父结点
            }
        }

    }

    @Override
    public String toString() {
        return "Node [value=" + value + "]";
    }

    // 添加结点的方法
    // 递归的形式添加结点，注意需要满足二叉排序树的要求
    public void add(Node node) {
        if (node == null) {
            return;
        }

        // 判断传入的结点的值，和当前子树的根结点的值关系
        if (node.value < this.value) {
            // 如果当前结点左子结点为null
            if (this.left == null) {
                this.left = node;
            } else {
                // 递归的向左子树添加
                this.left.add(node);
            }
        } else { // 添加的结点的值大于 当前结点的值
            if (this.right == null) {
                this.right = node;
            } else {
                // 递归的向右子树添加
                this.right.add(node);
            }

        }

        //当添加完一个结点后，如果: (右子树的高度-左子树的高度) > 1 , 左旋转
        if(rightHeight() - leftHeight() > 1) {
            //如果它的右子树的左子树的高度大于它的右子树的右子树的高度
            if(right != null && right.leftHeight() > right.rightHeight()) {
                //先对右子结点进行右旋转
                right.rightRotate();
                //然后在对当前结点进行左旋转
                leftRotate(); //左旋转..
            } else {
                //直接进行左旋转即可
                leftRotate();
            }
            return ; //必须要!!!
        }

        //当添加完一个结点后，如果 (左子树的高度 - 右子树的高度) > 1, 右旋转
        if(leftHeight() - rightHeight() > 1) {
            //如果它的左子树的右子树高度大于它的左子树的高度
            if(left != null && left.rightHeight() > left.leftHeight()) {
                //先对当前结点的左结点(左子树)->左旋转
                left.leftRotate();
                //再对当前结点进行右旋转
                rightRotate();
            } else {
                //直接进行右旋转即可
                rightRotate();
            }
        }
    }

    // 中序遍历
    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

}

public class AVLTreeDemo {

    public static void main(String[] args) {      
        int[] arr = { 14, 21, 7, 3, 8, 9 };//任意测试节点数组
        //创建一个 AVLTree对象
        AVLTree avlTree = new AVLTree();
        //添加结点
        for(int i=0; i < arr.length; i++) {
            avlTree.add(new Node(arr[i]));
        }

        //遍历
        System.out.println("中序遍历");
        avlTree.infixOrder();

        System.out.println("平衡处理...");
        System.out.println("树的高度=" + avlTree.getRoot().height()); 
        System.out.println("树的左子树高度=" + avlTree.getRoot().leftHeight()); 
        System.out.println("树的右子树高度=" + avlTree.getRoot().rightHeight());
        System.out.println("当前的根结点=" + avlTree.getRoot());
    }
}
```

## 7. AVL树总结
1. 平衡二叉树又称AVL树。
2. 平衡二叉树查询、插入、删除的时间复杂度都是 O(logN) 。
3. 插入节点失去平衡的情况有4种，左左，左右，右左，右右。
4. 右右、左左只需要旋转一次就可以平衡，而左右、右左要旋转两次才能把树调整平衡！
5. 失去平衡最多也只要旋转2次，所以，调整平衡的过程的时间复杂度为O(1)。

虽然平衡二叉树有效的解决了极端类似蛇皮单链表的情况，但是平衡二叉树也不是完美的，AVL树最大的缺点就是删除节点时有可能因为失衡，导致需要从删除节点的父节点开始，不断的回溯到根节点，如果这棵AVL树很高的话，那中间就要判断很多个节点，效率就显然变的低下！

来源于 https://juejin.cn/post/6844904023015817223#heading-3