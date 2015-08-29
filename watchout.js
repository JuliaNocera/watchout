// start slingin' some d3 here.
var board = d3.select(".board").style({'height' : window.innerHeight - 100 + "px", 'width' : window.innerWidth - 15 + "px"});

var createEnemies = function() {
  return _.range(0, 10).map(function(item) {
    return {
      id: item,
    }
  })
}

var pixelize = function(number) {
  return number + "px";
}


var player = board.select(".player").style( {
  top: pixelize(window.innerHeight / 2),
  left: pixelize(window.innerWidth / 2),
  "background-color": "red"

});
//console.log(d3.event.dx)
function dragFunc(event) {
  player.style({
    "left": pixelize(d3.event.dx + parseInt(player.style("left"))),
    "top": pixelize(d3.event.dy + parseInt(player.style("top")))
  });
}

var drag = d3.behavior.drag().on('drag', dragFunc)

player.call(drag);


var prevCol = false;
var detectCollision = function() {
  var collision = false;
  var highScore = d3.select(".high").select("span");
  var currentScore = d3.select(".current").select("span");
  var collisionCount = d3.select(".collisions").select("span");
  
  enemies.each(function() {
    var enemy = d3.select(this);
    var radiusSum = 20 + 20
    var xDiff = parseFloat(enemy.style('left')) - parseFloat(player.style("left"))
    var yDiff = parseFloat(enemy.style('top')) - parseFloat(player.style("top"))
    var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
    if(separation < radiusSum) {
      collision = true;
    }
  });
    
  if(collision) {
    //Chech if high score is less the current score
    if(parseInt(highScore.text()) < parseInt(currentScore.text())){
      //Set high score to current
      highScore.text(currentScore.text());
    }
    //Reset current score
    currentScore.text(0);
    if(prevCol != collision) {
        collisionCount.text(parseInt(collisionCount.text())+1); 
    }
  }
  prevCol = collision;
}
d3.timer(detectCollision)


var enemies = board.selectAll(".enemy").data(createEnemies, function(item) {return item.id}).enter().append("div").attr("class", "enemy");


var update = function(element){

  element.transition().duration(2000).style({
    left: pixelize(Math.random() * window.innerWidth),
    top: pixelize(Math.random() * window.innerHeight),
  }).each("end",function() {
    update(d3.select(this));
  });
};

update(enemies);  


// "top", function(enemy) {
//     return pixelize(enemy.x);
//   }).attr("left", function(enemy) {
//     return pixelize(enemy.y);
//   }

function updateScore() {
  this.text(parseInt(this.text())+1);
}

setInterval(updateScore.bind(d3.select(".current").select("span")), 100);

//setInterval(rotate, 1000);


