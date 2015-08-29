// start slingin' some d3 here.
var board = d3.select("body").append("svg").style({'height' : window.innerHeight, 'width' : window.innerWidth});

var createEnemies = function() {
  return _.range(0, 5).map(function(item) {
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

function checkCol(enemy, collidedCallback) {
  var radiusSum = 20 + 20
  var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(player.attr("cx"))
  var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(player.attr("cy"))
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
  if(separation < radiusSum) {
    collidedCallback(player, enemy);
  }

}


var tweenWithCollisionDetection = function(endData) {
  //Select current passed in eneamy
  var enemy = d3.select(this);

  var startPos = {
    x: parseFloat(enemy.attr("cx")),
    y: parseFloat(enemy.attr("cy")),
  }
  var endPos = {
    x: endData.x,
    y: endData.y,
  }

  return function(t) {
    checkCol(enemy, function() {
      console.log("t")
      //Chech if high score is less the current score
        //Set high score to current
      //Reset current score
      //collisions++

    });

    enemyNexPos = {
      x: startPos.x + (endPos.x - startPos.x)*t,
      y: startPos.y + (endPos.y - startPos.y)*t,
    }
    if(isNaN(enemyNexPos.x) || isNaN(enemyNexPos.y)) {
      return;
    }

    return enemy.attr("cx", enemyNexPos.x).attr("cy", enemyNexPos.y);


  }
}

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
  }).duration(1000).tween("custom", tweenWithCollisionDetection).each("end",update);
};

update();  



console.log(enemies);