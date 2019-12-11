// Returns given list with given indices swapped
function swap(l, first, second) {
    console.log(l);
    let newlist;
    let temp = l.get(second);
    newlist = l.update(second, val => val = l.get(first));
    newlist = newlist.update(first, val => val = temp);
    console.log(newlist);
    return newlist;
}