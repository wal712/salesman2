// import { List, Range } from "immutable";

// Board Parameters
let numNodes;
let nodes;
let size;
let indexes;



function setup() {
  createCanvas(800, 800);

  numNodes = 9; //TODO: Make slider for controlling value
  size = 20; // TODO: Slider for value control

  // Push numNodes random vectors to nodes list
  nodes = Immutable.List();
  for (let i = 0; i < numNodes; i++) {
    let vec = createVector(Math.random() * width, Math.random() * height);
    nodes = nodes.push(vec);
  }

  indexes = Immutable.Range(0, numNodes).toList();
  console.log(indexes.get(2));
}

function draw() {
  background(20);
  // Draw Location Nodes
  for (const vec of nodes) {
    ellipse(vec.x, vec.y, size, size);
  }
}