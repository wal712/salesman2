// Generates new generation
function newGen(currGen) {
    const pool = tourneySelect(currGen);
}

// Tournament selection method for generating new breeding pool
function tourneySelect(currPool) {
    let newPool = Immutable.List();
    for (let i = 0; i < currPool.size; i++) {
        const c1 = Math.floor(Math.random() * currPool.size);
        const c2 = Math.floor(Math.random() * currPool.size);
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