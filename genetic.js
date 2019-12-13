// Generates new generation
function newGen(currNodes, currGen, gSize) {
    const pool = tourneySelect(currGen);
    let newPool = Immutable.List();

    // breed gSize kids from random parents of pool
    for (let i = 0; i < gSize; i++) {
        const c1 = randIdx(pool.size);
        const c2 = randIdx(pool.size);
        let child = breed(pool.get(c1), pool.get(c2));
        let tlist = Immutable.List([child, pathLength(currNodes, child)]);
        newPool = newPool.push(tlist);
    }
    return newPool;
}

// Tournament selection method for generating new breeding pool
function tourneySelect(currPool) {
    let newPool = Immutable.List();
    for (let i = 0; i < currPool.size; i++) {
        const c1 = randIdx(currPool.size);
        const c2 = randIdx(currPool.size);
        const p1 = currPool.get(c1);
        const p2 = currPool.get(c2);

        // if p1 has better fitness add to pool otherwise add p2
        if (p1.get(1) < p2.get(1)) {
            newPool = newPool.push(p1.get(0));
        } else {
            newPool = newPool.push(p2.get(0));
        }
    }
    return newPool;
}

// Breeds new child from given two parents
// Uses: https://en.wikipedia.org/wiki/Edge_recombination_operator
function breed(p1, p2) {
    const m1 = createMatrix(p1);
    const m2 = createMatrix(p2);

    let fMatrix = Immutable.OrderedMap(); 
    // Forms unions of sets from above matrices into new matrix
    for (const key of m1.keys()) {
        fMatrix = fMatrix.set(key, Immutable.Set.union([m1.get(key), m2.get(key)]));
    }
    
    // Creates child
    let child = Immutable.OrderedSet();
    let n = p1.get(0);

    while (child.size < p1.size) {
        child = child.add(n);
        let neighbors = fMatrix.get(n);
        fMatrix = fMatrix.map(x => x.delete(n));

        if (neighbors.size > 0) {
            let smallest = neighbors.toArray()[0];
            for (const key of neighbors) {
                if (fMatrix.get(key).size < fMatrix.get(smallest).size) {
                    smallest = key;
                }
            }
            n = smallest;
        } else {
            n = randIdx(p1.size);
        }
    }
    return Immutable.List(child);
}

// Returns adjacency matrix of given path
function createMatrix(path) {
    const sorted = path.sort();
    let matrix = Immutable.OrderedMap();

    // Goes through each index in order and associates it with a set of its neighbors
    for (const n of sorted) {
        const idx = path.indexOf(n);

        if (idx === path.size - 1) {
            const temp = Immutable.Set([path.get(idx - 1), path.get(0)]);
            matrix = matrix.set(n, temp);
        } else {
            const temp = Immutable.Set([path.get(idx - 1), path.get(idx + 1)]);
            matrix = matrix.set(n, temp);
        }
    }
    return matrix;
}