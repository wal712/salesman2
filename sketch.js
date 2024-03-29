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
let mutationRate;

function setup() {
  createCanvas(800, 800);

  numNodes = 20; //TODO: Make slider for controlling value
  size = 20; // TODO: Slider for value control

  // Push numNodes random vectors to nodes list
  nodes = [];
  for (let i = 0; i < numNodes; i++) {
    let vec = createVector(Math.random() * width, Math.random() * height);
    nodes.push(vec);
  }
  nodes = Immutable.List(nodes);

  indexes = Immutable.Range(0, numNodes).toList();

  // Initializes Lexocographic order 
  currLexOrder = indexes;
  bestLexOrder = indexes;
  currLexScore = pathLength(nodes, currLexOrder);
  bestLexScore = currLexScore;

  // Initializes Genetic algorithm
  genSize = 20; // TODO: Make Slider for value
  mutationRate = 0.1; //TODO: same above
  generation = Immutable.List();
  bestGenScore = Infinity;

  // Pushes genSize shuffled orders to generation
  for (let i = 0; i < genSize; i++) {
    const arr = shuffle(indexes.toArray());
    const temp = Immutable.List(arr);
    const pLen = pathLength(nodes, temp);
    generation = generation.push(Immutable.List([temp, pLen]));
    
    // Finds best offspring of initial generation 
    if (pLen < bestGenScore) {
      bestGenScore = pLen;
      bestGenOrder = temp;
    }
  }

}

// TODO: Add functionality for user to add locations manually by clicking

function draw() {
  background(20);

  // Draw Location Nodes
  stroke(255);
  fill(255);
  for (const vec of nodes) {
    if (nodes.get(bestLexOrder.get(0)).equals(vec) || nodes.get(bestLexOrder.get(bestLexOrder.size - 1)).equals(vec)) {
      fill(255, 0, 0);
    } 
    if (nodes.get(bestGenOrder.get(0)).equals(vec) || nodes.get(bestGenOrder.get(bestGenOrder.size - 1)).equals(vec)) {
      fill(0, 255, 0);
    }
    ellipse(vec.x, vec.y, size, size);
    fill(255);
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
  currLexScore = pathLength(nodes, currLexOrder);
  if (currLexScore < bestLexScore) {
    bestLexScore = currLexScore;
    bestLexOrder = currLexOrder;
  }

  // Draws Gen path
  stroke(0, 255, 0);
  for (let i = 0; i < bestGenOrder.size - 1; i++) {
    vec1 = nodes.get(bestGenOrder.get(i));
    vec2 = nodes.get(bestGenOrder.get(i + 1));
    line(vec1.x, vec1.y, vec2.x, vec2.y);
  }

  // Print Gen scores
  stroke(0, 255, 0);
  fill(0, 255, 0);
  textSize(20);
  text(`Best Gen Score: ${Math.round(bestGenScore, 2)}`, width - 250, 60);

  // Generates next generation and checks for better offspring
  generation = newGen(nodes, generation, genSize, mutationRate);
  for (const path of generation) {
    if (path.get(1) < bestGenScore) {
      bestGenScore = path.get(1);
      bestGenOrder = path.get(0);
    }
  }

  // Kills draw function if every permutation has been seen
  if (currLexOrder.equals(indexes)) {
    console.log('done!');
    noLoop();
  }
}



