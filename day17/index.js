const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), true)
const matrix = lines.map(line => line.split(""));
// console.log(matrix)
const maxR = matrix.length;
const maxC = matrix[0].length;
const graph = new Map();
const costs = new Map();
const parents = new Map();

for (let r = 0; r < maxR; r++) {
  for (let c = 0; c < maxC; c++) {
    graph.set(`${r},${c}`, new Map());
    costs.set(`${r},${c}`, Number.POSITIVE_INFINITY);
    parents.set(`${r},${c}`, null);
    if (r === maxR - 1 && c === maxC - 1) continue;
    if (r > 0) {
      graph.get(`${r},${c}`).set(`${r - 1},${c}`, parseInt(matrix[r - 1][c]));
    }
    if (c > 0) {
      graph.get(`${r},${c}`).set(`${r},${c - 1}`, parseInt(matrix[r][c - 1]));
    }
    if (r < maxR - 1) {
      graph.get(`${r},${c}`).set(`${r + 1},${c}`, parseInt(matrix[r + 1][c]));
    }
    if (c < maxC - 1) {
      graph.get(`${r},${c}`).set(`${r},${c + 1}`, parseInt(matrix[r][c + 1]));
    }
  }
}

graph.get("0,0").forEach((value, node) => {
  costs.set(node, value);
  parents.set(node, "0,0");
});

// keep track of processed nodes
const processed = [];

function findLowestCostNode(costs) {
  let lowestCost = Number.POSITIVE_INFINITY;
  let lowestCostNode = null;
  costs.forEach((cost, node) => {
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestCostNode = node;
    }
  });
  return lowestCostNode;
}

let node = findLowestCostNode(costs);
while (node) {
  console.log(node);
  const nodeCost = costs.get(node);
  const neighbours = graph.get(node);
  neighbours.forEach((cost, neighbour) => {
    const newNodeCost = nodeCost + cost;
    if (costs.get(neighbour) > newNodeCost) {
      costs.set(neighbour, newNodeCost);
      parents.set(neighbour, node);
    }
  });
  processed.push(node);
  node = findLowestCostNode(costs);
}

console.log("Part One:", costs.get(`${maxR-1},${maxC-1}`));