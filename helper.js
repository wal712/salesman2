// Returns given list with given indices swapped
function swap(l, first, second) {
    let newlist;
    let temp = l.get(second);
    newlist = l.update(second, val => val = l.get(first));
    newlist = newlist.update(first, val => val = temp);
    return newlist;
}