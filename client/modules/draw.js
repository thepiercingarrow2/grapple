var draw = {};

draw.circle = function(g, x, y, r){
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
    g.fill();
};

draw.label = function(g, x, y, l){g.font = "20px Monaco";
	g.textAlign = "center";
	g.fillText(players[p].name, x, y - 35);
}
