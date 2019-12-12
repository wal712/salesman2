// import * as lex from './lex.js';

// Board Parameters
let numNodes;
let nodes;
let size;
let indexes;

// Lexocographic order variables
let bestLexOrder;
let bestLexScore;
let currLexScore;
let currLexOrder;

// Genetic algorithm variables
let genSize;
let generation;
let bestGenOrder;
let bestGenScore;

function setup() {
  createCanvas(800, 800);

  numNodes = 7; //TODO: Make slider for controlling value
  size = 20; // TODO: Slider for value control

  // Push numNodes random vectors to nodes list
  nodes = Immutable.List();
  for (let i = 0; i < numNodes; i++) {
    let vec = createVector(Math.random() * width, Math.random() * height);
    nodes = nodes.push(vec);
  }

  indexes = Immutable.Range(0, numNodes).toList();

  // Initializes Lexocographic order 
  currLexOrder = indexes;
  bestLexOrder = indexes;
  currLexScore = pathLength(currLexOrder);
  bestLexScore = currLexScore;

  // Initializes Genetic algorithm
  genSize = 10; // TODO: Make Slider for value
  generation = Immutable.List();
  bestGenScore = Infinity;

  // Pushes genSize shuffled orders to generation
  for (let i = 0; i < genSize; i++) {
    const arr = shuffle(indexes.toArray());
    const temp = Immutable.List(arr);
    generation = generation.push(temp);
    
    // Finds best offspring of initial generation 
    const pLen = pathLength(temp);
    if (pLen < bestGenScore) {
      bestGenScore = pLen;
      bestGenOrder = temp;
    }
  }

}

function draw() {
  background(20);

  // Draw Location Nodes
  stroke(255);
  fill(255);
  for (const vec of nodes) {
    ellipse(vec.x, vec.y, size, size);
  }

  // Draws Lex path
  stroke(255, 0, 0);
  for (let i = 0; i < bestLexOrder.size - 1; i++) {
    vec1 = nodes.get(bestLexOrder.get(i));
    vec2 = nodes.get(bestLexOrder.get(i + 1));
    line(vec1.x, vec1.y, vec2.x, vec2.y);
  }

  // Print Lex scores
  stroke(255, 0, 0);
  fill(255, 0, 0);
  textSize(20);
  // Should use p5.js round function instead
  text(`Brute Force Score: ${Math.round(bestLexScore, 2)}`, width - 250, 30);

  // Get next Lex order and check if it's better than bestLexOrder
  currLexOrder = nextLex(currLexOrder);
  currLexScore = pathLength(currLexOrder);
  if (currLexScore < bestLexScore) {
    bestLexScore = currLexScore;
    bestLexOrder = currLexOrder;
  }

  // Print Gen scores
  stroke(0, 255, 0);
  fill(0, 255, 0);
  textSize(20);
  text(`Best Gen Score: ${Math.round(bestGenScore, 2)}`, width - 250, 60);

  // Kills draw function if every permutation has been seen
  if (currLexOrder.equals(indexes)) {
    console.log('done!');
    noLoop();
  }
}

// Returns sum of distances between nodes in given order
function pathLength(order) {
  let total = 0;
  for (let i = 0; i < order.size - 1; i++) {
    const vec1 = nodes.get(order.get(i));
    const vec2 = nodes.get(order.get(i + 1));
    total += dist(vec1.x, vec1.y, vec2.x, vec2.y);
  }
  return total;
}

