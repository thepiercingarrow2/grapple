var TAU = 2 * Math.PI;

function dist(x1, y1, x2, y2){
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

function objcp(o1, o2) {
    for (var p in o1)
        o2[p] = o1[p];
}

function objcmp(o1, o2) {
    var eq = true;
    for (var p in o1) {
        if (o1[p] != o2[p]) {
            o1[p] = o2[p];
            eq = false;
        }
    }
    return eq;
}
