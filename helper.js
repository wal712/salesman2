// Returns given list with given indices swapped
function swap(l, first, second) {
    let newlist;
    let temp = l.get(second);
    newlist = l.update(second, val => val = l.get(first));
    newlist = newlist.update(first, val => val = temp);
    return newlist;
}

// Returns sum of distances between nodes in given order
function pathLength(currNodes, order) {
    let total = 0;
    for (let i = 0; i < order.size - 1; i++) {
        const vec1 = currNodes.get(order.get(i));
        const vec2 = currNodes.get(order.get(i + 1));
        total += dist(vec1.x, vec1.y, vec2.x, vec2.y);
    }
    return total;
}

// Returns random index from given list size
function randIdx(arrsize) {
    return Math.floor(Math.random() * arrsize);
}