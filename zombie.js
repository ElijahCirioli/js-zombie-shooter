var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

//The Variables
var tileSize = 32;
var key = 0;
var newX = 0;
var newY = 0;
var xRayAngles = [];
var baddies = [];
var angle = 0;
var length = 0;
var height = 0;
var bob = 10;
var bi = 1;
var overheat = 0;
var ammo = 6;
var bx = 0;
var by = 0;
var playing = false;
var reload = 0;
var zClip = 0;
var frame = 0;
var health = 100;
var badi = 0;
var moveStep = 0;
var strafeStep = 0;
var badX = 0;
var badY = 0;
var baddiesSeen = [];
var wave = 1;
var dispWave = 1;

var kyle = Math.floor(Math.random() * 40);

var wallImage = "./wall.png";
var gunImage = "./gunOff.png";
var gunShot = "./gunShot.png";
var baddieImage = "./baddie.png";
var mainScreenImage = "./menu.png";

var gunSound = new Audio("http://soundbible.com/grab.php?id=2120&type=wav");

//calculate as 160/Tan(1/2 of viewing angle in radians) ---- assume viewing angle of 60 degrees
var distanceToPlane = 400 / Math.abs(Math.tan(30 * Math.PI / 180)); // 277;

for (var x = 0; x < 800; x += 2) {
  var xAng = Math.atan((x - 400) / distanceToPlane);
  xRayAngles.push(xAng);
}

var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//The Guy
var player = {
  x: 80,
  y: 80,
  dir: 0,
  rot: 1.5707963268,
  speed: 0,
  moveSpeed: 3,
  rotSpeed: 3 * Math.PI / 180,
  strafe: 0
}

//The Bad Guy
function baddie(x, y) {
  this.x = x;
  this.y = y;
  this.health = 1;
  this.height = 0;
  this.dir = 0;
  this.rot = 1.5707963268;
  this.angle = 0;
  this.speed = 0;
  this.moveSpeed = 2; 
  this.rotSpeed = 6 * Math.PI / 180;  
  this.strafe = 0;
  this.canSee = false;
  this.rayX = 0;
  this.rayY = 0;
  this.length = 0;
 
  baddies.push(this);
}



//That One Function That Does Everthing
function gameCycle() {
  if (playing === false) {
    context.drawImage(mImg, 0, 0, 800, 550);
  } else {
    move();
    render();
    renderBaddie();

    //gun bobbing
    if ((player.speed !== 0 || player.strafe !== 0) && reload === 0) {
      context.drawImage(gImg, -200, 100 + bob, 1200, 450);
      bob += bi;
      if (bob >= 10) {
        bi = -1;
      } else if (bob <= 0) {
        bi = 1;
      }
    } else if (reload === 0) {
      context.drawImage(gImg, -200, 100, 1200, 450)
    }

    //gun mechanics
    if (overheat > 0) {
      overheat -= 1;
    }
    if (overheat === 18) {
      gImg.src = gunImage;
    }
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.fillText(ammo, 740, 530);
    context.fillStyle = "limeGreen";
    if (health < 75) {
      context.fillStyle = "yellow";
    }
    if (health < 50) {
      context.fillStyle = "orange";
    }
    if (health < 25) {
      context.fillStyle = "red";
    }
    context.fillText(health, 30, 530);
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText("Wave: " + dispWave, 10, 32);
    context.fillText("Zombies: " + baddies.length, 630, 30);
    
    if (kyle === 26) {
    	context.fillStyle = "rgba(0,0,0,0.1)";
    	context.font = "70px Arial";
    	context.fillText("MUSIC BY KYLE BEZIO", 10, 250);
    	context.font = "50px Arial";
    	context.fillText("www.bezio.kyle/music/kyle.com", 50, 300);
    }

  	if (ammo === 0) {
    	ammo = 6;
    	reload = 120;
  	}
  	if (reload > 0 && reload < 60) {
    	context.drawImage(gImg, -200, 100 + (reload * 3), 1200, 450);
    	if (player.moveSpeed === 3) {
      	reload -= 1;
      }
  	}
  	if (reload > 0 && reload > 59) {
    	context.drawImage(gImg, -200, 460 - (reload * 3), 1200, 450);
    	if (player.moveSpeed === 3) {
      	reload -= 1;
      }
  	}
 	}
 	waveControl();
}

//The Minimap
function drawMap() {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        context.fillStyle = "black";
        context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  }
}

//Draw the Guy
player.draw = function() {
  context.fillStyle = "red";
  context.save();
  context.translate(player.x + 8, player.y + 8);
  context.rotate(player.rot);
  context.fillRect(-8, -8, 16, 16)
  context.fillStyle = "black";
  context.fillRect(4, -4, 2, 2)
  context.fillRect(4, 2, 2, 2)
  context.restore();
}


//That one that moves the guy
function move() {
  moveStep = player.speed * player.moveSpeed;
  strafeStep = player.strafe * player.moveSpeed;
  if (moveStep != 0 && strafeStep != 0) {
    strafeStep /= 1.7;
    moveStep /= 1.7;
  }

  player.rot += player.dir * player.rotSpeed;

  if (player.rot > 6.2831853072) {
    player.rot = 0;
  } else if (player.rot < 0) {
    player.rot = 6.2831853072;
  }

  newX = player.x + Math.cos(player.rot) * moveStep;
  newY = player.y + Math.sin(player.rot) * moveStep;
  newX = newX + Math.cos(player.rot + 1.5707963268) * strafeStep;
  newY = newY + Math.sin(player.rot + 1.5707963268) * strafeStep;

  if (isBlocking((newX) / 32, (newY) / 32)) { // are we allowed to move to the new position?
    return; //no
  }
  // Set new position
  player.x = newX;
  player.y = newY;
}

//Can I Move To The New Spot
function isBlocking(x, y) {
  return (map[Math.floor(y)][Math.floor(x)] != 0);
}

function render() {
  //floor and ceiling
  context.fillStyle = "#5e5e5e"
  context.fillRect(0, 0, 800, 275);
  context.fillStyle = "#3f3c3a";
  context.fillRect(0, 275, 800, 275);
  //shoot rays
  angle = player.rot;
  baddiesSeen = [];
  var baddieIs = [];
  var baddieHeights = [];
  //get the inital angle for math 
  var initialAngle = angle;
  for (var i = 0; i < 400; i++) {
    //i = pixels / 2
    //find the difference between ray angle and initial angle
    var beta = xRayAngles[i];
    //calculate height using the tileSize, ray angle, the cos of beta (to fix fisheye), and distance from man to viewing plane
    var data = castRay(xRayAngles[i] + initialAngle);
    height = Math.round(tileSize / (data[0] * Math.cos(beta)) * distanceToPlane);
    //player.rot - angle
    //cos(dfference between angles);
    //very proud of this drawing math
    if (Math.ceil(Math.ceil(data[2]) / tileSize) === (Math.ceil(data[2]) / tileSize) || Math.floor(Math.floor(data[2]) / tileSize) === (Math.floor(data[2]) / tileSize)) {

      context.drawImage(wImg, (data[1] - (Math.floor(data[1] / tileSize)) * tileSize) * 2, 0, 2, 64, i * 2, 275 - (height / 2), height / 32, height);

    } else if (Math.ceil(Math.ceil(data[1]) / tileSize) === (Math.ceil(data[1]) / tileSize) || Math.floor(Math.floor(data[1]) / tileSize) === (Math.floor(data[1]) / tileSize)) {

      context.drawImage(wImg, (data[2] - (Math.floor(data[2] / tileSize)) * tileSize) * 2, 0, 2, 64, i * 2, 275 - (height / 2), height / 32, height)

    }
    context.fillStyle = "rgba(0, 0, 0, " + 40 / height + ")";
    context.fillRect(i * 2, 275 - (height / 2), 2, height);
      if (data[3] > 0) {
        baddieHeights.push(Math.round(tileSize / (data[3] * Math.cos(beta)) * distanceToPlane) * .7); 
        baddieIs.push(i);
      }
 }

  frame += 1;
  if (frame % 15 === 0) {
    zClip += 256;
    if (zClip > 256) {
      zClip = 0;
    }
    frame = 0;
  }

  for (var i = 0; i < baddiesSeen.length; i++) {
      context.drawImage(bImg, zClip, 0, 256, 512, baddieIs[i] * 2 - ((1 / 4) * baddieHeights[i]), 280 - ((1 / 2) * baddieHeights[i]), baddieHeights[i] / 2, baddieHeights[i]);
  }
}

function castRay(angle) {
  var rayX = player.x;
  var rayY = player.y;
  length = 0;
  var bl = 0;
  while (map[Math.floor(rayY / 32)][Math.floor(rayX / 32)] === 0) {
    for (var i = 0; i < baddies.length; i++) {
    	var baddie = baddies[i];
      if (Math.floor(rayX) === Math.floor(baddies[i].x) && Math.floor(rayY) === Math.floor(baddies[i].y) && baddiesSeen.indexOf(baddie) < 0) {
  		 baddiesSeen.push(baddie);
       bl = Math.floor(Math.sqrt(Math.pow(rayX - player.x, 2) + Math.pow(rayY - player.y, 2)));
      }
    }
    //if (Math.round(player.x) === Math.round(baddie.x) && Math.round(player.y) === Math.round(baddie.y)) {
    //	bl = 1;
    // }
    rayX = rayX + Math.cos(angle) * 1;
    rayY = rayY + Math.sin(angle) * 1;

    //if the ray.x === baddie.x && the ray.y === baddie.y
    //drawRay(rayX,rayY)
  }
  length = Math.sqrt(Math.pow(rayX - player.x, 2) + Math.pow(rayY - player.y, 2));
  var rayInfo = [length, rayX, rayY, bl];
  return rayInfo;
}

function renderBaddie() {
  //shoot rays
  for (var i = 0; i < baddies.length; i++) {
    baddies[i].angle = Math.atan2(player.y - baddies[i].y, player.x - baddies[i].x);
    castCanSeeRay(baddies[i], baddies[i].angle);
  }
}

function castCanSeeRay(baddie, angle) {
  baddie.rayX = baddie.x;
  baddie.rayY = baddie.y;
  context.fillStyle = "white";
  baddie.length = Math.round(Math.sqrt(Math.pow(player.x - baddie.x, 2) + Math.pow(player.y - baddie.y, 2)));
  while (map[Math.floor(baddie.rayY / 32)][Math.floor(baddie.rayX / 32)] === 0 && Math.floor(baddie.rayX) != Math.floor(player.x) && Math.floor(baddie.rayY) != Math.floor(player.y)) {
    baddie.rayX += Math.cos(angle) * 1;
    baddie.rayY += Math.sin(angle) * 1;
  }
  if (Math.floor(baddie.rayX) != Math.floor(player.x) && Math.floor(baddie.rayY) != Math.floor(player.y)) {
    baddie.canSee = false;
  } else {
    baddies.canSee = true;
    if (baddie.length > 20) {
      baddie.x += Math.cos(baddie.angle) * 1.25;
      baddie.y += Math.sin(baddie.angle) * 1.25;
    } else {
      if (health > 0) {
        health -= 1;
      }
    }
  }
}

//the one that shoots (hitscan)
function shoot() {
	bx = player.x;
  by = player.y;
  while (map[Math.floor(by / 32)][Math.floor(bx / 32)] === 0) {
  	for (var i = 0; i < baddies.length; i++) {
    	var baddie = baddies[i];
  		var dx = bx - baddie.x;
			var dy = by - baddie.y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 3) {
    		baddies.splice(i,1);
        bx = 0;
        by = 0;
			}
    }
    bx += Math.cos(player.rot) * 1;
    by += Math.sin(player.rot) * 1;
  }
}

function waveControl() {
	if (wave === 1) {
  	new baddie(4 * tileSize, 11 * tileSize);
		new baddie(11 * tileSize, 3 * tileSize);
    new baddie(12 * tileSize, 13 * tileSize);
    new baddie(2 * tileSize, 20 * tileSize);
    wave += 1;
    dispWave = 1;
  }
  if (wave === 3) {
  	new baddie(3 * tileSize, 3 * tileSize);
    new baddie(12 * tileSize, 7 * tileSize);
    new baddie(22 * tileSize, 3 * tileSize);
    new baddie(22 * tileSize, 18 * tileSize);
    new baddie(18 * tileSize, 9 * tileSize);
    wave += 1;
    dispWave = 2;
  }
  if (wave === 5) {
  	new baddie(10 * tileSize, 7 * tileSize);
    new baddie(15 * tileSize, 7 * tileSize);
    new baddie(23 * tileSize, 3 * tileSize);
    new baddie(23 * tileSize, 23 * tileSize);
    new baddie(23 * tileSize, 17 * tileSize);
    new baddie(17 * tileSize, 17 * tileSize);
    wave += 1;
    dispWave = 3;
  }
  if (wave === 7) {
  	new baddie(23 * tileSize, 3 * tileSize);
    new baddie(15 * tileSize, 3 * tileSize);
    new baddie(10 * tileSize, 7 * tileSize);
    new baddie(5 * tileSize, 9 * tileSize);
    new baddie(19 * tileSize, 9 * tileSize);
    new baddie(13 * tileSize, 13 * tileSize);
    new baddie(9 * tileSize, 13 * tileSize);
    new baddie(17 * tileSize, 12 * tileSize);
    new baddie(12 * tileSize, 22 * tileSize);
    new baddie(3 * tileSize, 23 * tileSize);
    new baddie(3 * tileSize, 20 * tileSize);
    wave += 1;
    dispWave = 4;
  }
  if (wave === 9) {
  	new baddie(3 * tileSize, 3 * tileSize);
    new baddie(3 * tileSize, 10 * tileSize);
    new baddie(3 * tileSize, 21 * tileSize);
    new baddie(5 * tileSize, 23 * tileSize);
    new baddie(9 * tileSize, 17 * tileSize);
    new baddie(10 * tileSize, 7 * tileSize);
    new baddie(19 * tileSize, 9 * tileSize);
    new baddie(17 * tileSize, 12 * tileSize);
    new baddie(17 * tileSize, 17 * tileSize);
    new baddie(23 * tileSize, 17 * tileSize);
    new baddie(21 * tileSize, 17 * tileSize);
    new baddie(23 * tileSize, 23 * tileSize);
    wave += 1;
    dispWave = 5;
  }
  if (wave === 11) {
  	new baddie(3 * tileSize, 3 * tileSize);
    new baddie(15 * tileSize, 3 * tileSize);
    new baddie(23 * tileSize, 4 * tileSize);
    new baddie(19 * tileSize, 9 * tileSize);
    new baddie(15 * tileSize, 7 * tileSize);
    new baddie(11 * tileSize, 7 * tileSize);
    new baddie(23 * tileSize, 22 * tileSize);
    new baddie(13 * tileSize, 13 * tileSize);
    new baddie(9 * tileSize, 13 * tileSize);
    new baddie(9 * tileSize, 17 * tileSize);
    new baddie(3 * tileSize, 23 * tileSize);
    new baddie(23 * tileSize, 22 * tileSize);
    wave += 1;
    dispWave = 6;
  }
  if (wave === 13) {
  	new baddie(3 * tileSize, 3 * tileSize);
    new baddie(3 * tileSize, 6 * tileSize);
    new baddie(9 * tileSize, 3 * tileSize);
    new baddie(15 * tileSize, 3 * tileSize);
    new baddie(15 * tileSize, 7 * tileSize);
    new baddie(10 * tileSize, 7 * tileSize);
    new baddie(23 * tileSize, 4 * tileSize);
    new baddie(4 * tileSize, 9 * tileSize);
    new baddie(9 * tileSize, 13 * tileSize);
    new baddie(19 * tileSize, 9 * tileSize);
    new baddie(23 * tileSize, 13 * tileSize);
    new baddie(17 * tileSize, 12 * tileSize);
    new baddie(17 * tileSize, 17 * tileSize);
    new baddie(9 * tileSize, 17 * tileSize);
    new baddie(21 * tileSize, 17 * tileSize);
    new baddie(23 * tileSize, 17 * tileSize);
    new baddie(22 * tileSize, 23 * tileSize);
    new baddie(9 * tileSize, 22 * tileSize);
    new baddie(3 * tileSize, 21 * tileSize);
    new baddie(3 * tileSize, 15 * tileSize);
    new baddie(3 * tileSize, 23 * tileSize);
    new baddie(5 * tileSize, 23 * tileSize);
    wave += 1;
    dispWave = 7;
  }
  if (wave >= 15 && health > 0) {
  	context.fillStyle = "white";
    context.font = "100px Arial";
    context.fillText("You Win", 225, 300);
  }
  if (wave > 250) {
  	reset();
  }
  if (baddies.length === 0) {
  	wave += 1;
  }
  if (health === 0) {
  	baddies = [];
    context.fillStyle = "red";
    context.font = "100px Arial";
    context.fillText("You Lose", 215, 300);
  }
}

function reset() {
	playing = false;
  baddies = [];
  wave = 0;
  dispWave = 1;
  kyle = Math.floor(Math.random() * 40);
  ammo = 6;
  health = 100;
  player.x = 80;
  player.y = 80;
  player.rot = 1.5707963268;
}
//Key Controls
document.onkeydown = function(e) {
  //capture the event
  e = window.event || e;
  //get the key code
  key = e.keyCode;
  //prevent default event behavior
  e.preventDefault();
  playing = true;

  if (key === 87) {
    player.speed = 1;
  }
  if (key === 83) {
    player.speed = -1;
  }
  if (key === 37) {
    player.dir = -1;
  }
  if (key === 39) {
    player.dir = 1;
  }
  if (key === 65) {
    player.strafe = -1;
  }
  if (key === 68) {
    player.strafe = 1;
  }
  if (key === 32 && overheat === 0 && ammo > 0 && reload === 0 && player.moveSpeed === 3) {
    gunSound.currentTime = 0;
    gunSound.play();
    gImg.src = gunShot;
    overheat = 20;
    ammo -= 1;
    shoot();
  }
  if (key === 82 && ammo < 6) {
    ammo = 6;
    reload = 120;
  }
  if (key === 16) {
  	player.moveSpeed = 5;
  }
}

document.onkeyup = function(e) {
  //capture the event
  e = window.event || e;
  //get the key code
  key = e.keyCode;
  if (key === 87 || key === 83) {
    player.speed = 0;
  }
  if (key === 37 || key === 39) {
    player.dir = 0;
  }
  if (key === 65 || key === 68) {
    player.strafe = 0;
  }
  if (key === 32) {
    key = 0;
  }
  if (key === 82) {
    key = 0;
  }
  if (key === 16) {
  	player.moveSpeed = 3;
    key = 0;
  }
}

var wImg = new Image();
wImg.src = wallImage;

var gImg = new Image();
gImg.src = gunShot;
gImg.src = gunImage;

var bImg = new Image();
bImg.src = baddieImage;

var mImg = new Image();
mImg.src = mainScreenImage;

var thread = setInterval(gameCycle, 1000 / 30);