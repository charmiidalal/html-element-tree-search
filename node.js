/**
* Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, ids) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (stSring) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
    //Arry of CSS id on this element
    this.ids = ids;
  }

  search(selector) {
    /* If selector is null then through an error */
    if (selector == null || selector === undefined) {
      return "No Selector Given. Please pass a string selector!";
    }
    /* Declare current node, node to traverse and visit variables */
    var resultArr = [];
    var currentNode = "";
    var nodesTraversed = [];
    var nodesToVisit = [];
    /* Push current node and children nodes */
    nodesToVisit.push(this);
    /* Manage flag to avoid first parent node */
    var flagFirst = 0;
    while (nodesToVisit.length != 0) {
      var children = [];
      /* Pop visited nodes from the nodes visited array */
      currentNode = nodesToVisit.pop();
      if (nodesTraversed.indexOf(currentNode.ids) < 0 && flagFirst == 1) {
        nodesTraversed.push(currentNode.ids)
        for (var j = 0; j <= currentNode.classes.length; j++) {
          /* Check if selector is class or tag */
          if (selector.search(".") > -1 && currentNode.classes[j] == selector.replace(".", "")) {
            /* Push traversed matched nodes in result array */
            resultArr.push(currentNode);
          } else if (currentNode.tag == selector) {
             /* Push traversed matched nodes in result array */
            resultArr.push(currentNode);
          }
        }
      }
      flagFirst = 1;
       /* Check if current node has any children and push it to nodes to visit */
      children = currentNode.children;
      for (var i = 0; i < children.length; i++) {
        nodesToVisit.push(children[i]);
      }
    }
    /* Reverse array to return array in order */
    var resultSet = new Set(resultArr.reverse());
    resultArr = Array.from(resultSet);
    /* Return result array */
    return resultArr;
  }
}
/* Generate DOM tree */
//Main body - Div1 - Div3 - Section - Label
let lbl1 = new Node("label", [], [], "lbl-1");
//Main body - Div1 - Div3 - Section
let section1 = new Node("section", [lbl1], [], "sec-1");
//Main body - Div1 - Div4 - span4
let span4 = new Node("span", [], ["mania"], "span-4");
//Main body - Div1 - Div4 - span5
let span5 = new Node("span", [], ["mania", "note"], "span-5");
//Main body - Div1 - Div2 - p1
let p1 = new Node("p", [], ["sub1-p1", "note"], "para-1");
//Main body - Div1 - Div2 - span3
let span3 = new Node("span", [], ["sub1-span3"], "span-3");
//Main body  - Span6
let randomNode = new Node("span", [], ["randomSpan"], "span-6");
//Main body - Div1 - Span1
let span1 = new Node("span", [], ["note"], "span-1");
//Main body - Div1 - Span2
let span2 = new Node("span", [], [""], "span-2");
//Main body - Div1 - Div2
let divNode2 = new Node("div", [p1, span3], ["subContainer1"], "div-2");
//Main body - Div1 - Div3
let divNode3 = new Node("div", [section1], [], "div-3");
//Main body - Div1 - Div4
let divNode4 = new Node("div", [span4, span5], [], "div-4");
//Main body - Div1
let divNode1 = new Node("div", [span1, span2, divNode2, divNode3, divNode4], ["mainContainer"], "div-1");
//Main body
let body = new Node("body", [divNode1, randomNode], [], "content");

/* Test Cases Started */
console.log("Started...");
// Test case 1 -
console.log("Test Case 1");
console.log(divNode1.search("span"));
// Test case 2 -
console.log("Test Case 2");
console.log(divNode1.search(".note"));
// Test case 3 -
console.log("Test Case 3");
console.log(divNode1.search("label"));
// Test case 4 -
console.log("Test Case 4");
console.log(p1.search(".note"));
// Test case 5 -
console.log("Test Case 5");
console.log(divNode1.search("div"));
// Test case 6 -
console.log("Test Case 6");
console.log(randomNode.search("div"));
// Test case 7 -
console.log("Test Case 7");
console.log(divNode2.search("section"));
// Test case 8 -
console.log("Test Case 8");
console.log(body.search());
// Error conditions need to be handled
// invalid input need to be handled
// Test case 9 -
console.log("Test Case 9");
console.log(body.search("section"));
// Test case 10 -
console.log("Test Case 10");
console.log(divNode1.search(".randomSpan"));
// randomSpan is some Span outside your divNode1 closed
/* Test Cases Ended */