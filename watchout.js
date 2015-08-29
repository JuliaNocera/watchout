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


var player = board.append("circle").attr("class", ".player");
player.attr("cx", window.innerWidth / 2)
player.attr("cy", window.innerHeight / 2)
player.attr("points", "05,30 15,10 25,30")
player.attr("r", 20);
player.attr("fill", "red");
//console.log(d3.event.dx)
function dragFunc(event) {
  player.attr("cx", d3.event.dx + parseInt(player.attr("cx")));
  player.attr("cy", d3.event.dy + parseInt(player.attr("cy")));
}

var drag = d3.behavior.drag().on('drag', dragFunc)

player.call(drag);




var enemies = board.selectAll("circle").filter(".enemy").data(createEnemies, function(item) {return item.id}).enter().append("svg:circle").attr("class", ".enemy");
enemies.style({"r": 20, "fill": "blue"});

var update = function(){
  enemies.each(function(enemy) {
    enemy.x = Math.random() * window.innerWidth;
    enemy.y = Math.random() * window.innerHeight;
  });
  enemies.transition().attr("cx", function(enemy) {
    return enemy.x;
  }).attr("cy", function(enemy) {
    return enemy.y;
  }).duration(1000).each("end",update);
};

update();  



console.log(enemies);