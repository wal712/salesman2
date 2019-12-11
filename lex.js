// Returns the next lex iteration of given list
function nextLex(order) {
    // find largest x such that order[x] < order[x + 1]
    let x = -1;
    for (let i = 0; i < order.size - 1; i++) {
        if (order.get(i) < order.get(i + 1)) {
            x = i;
        }
    }

    // If no such x is found, this is last permutation, so return sorted list
    if (x === -1) {
        return order.sort();
    }

    // Find largest y such that order[x] < order[y]
    let y = x+1;
    for (let i = y; i < order.size; i++) {
        if (order.get(x) < order.get(i)) {
            y = i;
        }
    }

    let neworder = swap(order, x, y);
    let t1 = neworder.slice(0, x + 1);
    let t2 = neworder.slice(x + 1);
    t2 = t2.reverse();
    return t1.concat(t2);
}