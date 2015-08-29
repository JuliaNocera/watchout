// start slingin' some d3 here.
var board = d3.select("body").append("svg").style({'height' : window.innerHeight, 'width' : window.innerWidth});

var createEnemies = function() {
  return _.range(0, 50).map(function(item) {
    return {
      id: item,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }
  })
}


var enemies = board.selectAll("circle").data(createEnemies, function(item) {return item.id}).enter().append("svg:circle");
enemies.style({"r": 20, "fill": "blue"});
enemies.attr("cx", function(enemy) {
  return enemy.x;
});
enemies.attr("cy", function(enemy) {
  return enemy.y;
});

console.log(enemies);