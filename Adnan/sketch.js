// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyA9CZsDu4RBIwxgkAwnQrbfBfvG8QZWLFE",
   authDomain: "adnan-ahmed-d4eb6.firebaseapp.com",
   databaseURL: "https://adnan-ahmed-d4eb6.firebaseio.com",
   projectId: "adnan-ahmed-d4eb6",
   storageBucket: "adnan-ahmed-d4eb6.appspot.com",
   messagingSenderId: "289210656705",
   appId: "1:289210656705:web:c9b8091b4c7627cf"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 let database = firebase.database()

let x
let y
let a
let b
let c
let d
let score
let enemyCount
let level
let speed
let my_speed
let time
let MUI = document.getElementById("MUI") 
let scoreboard = {  }


function setup() {
  createCanvas(windowWidth,windowHeight);
  x=255
  y=15
  a=0
  b=235
  c=[271, 176, 212, 236, 435, 133, 363, 242, 146]
  d=[271, 416, 403, 110, 416, 304, 524, 313, 346]
  score = 0
  enemyCount = 5
  level = 1
  speed = 5
  my_speed = 5
  time = 30
}

function draw() {
  if (time > 0) {

  background(0, 20, 204);
  fill(0)
  textSize(35)
  text("Score: " +score,50,30)	
  text("Time: " +time.toFixed(0),50,60)
  fill(255, 15, 15)
  circle(x, y, 20)
if (touches.length == 0)   {
 if (keyIsDown(LEFT_ARROW)) {
    x = x - my_speed
  }
 if (keyIsDown(RIGHT_ARROW)) {
    x = x + my_speed
  } 
  if (keyIsDown(UP_ARROW)) {
    y = y - my_speed
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + my_speed
  }
}
else { 
x = touches[0].x
y = touches[0].y
}

  fill(0,235,47)
  circle(a, b, 47)
  a = a + 5
  
  if ( a > width) {
	a = 0
  }
  if ( b  > height) {
	b = 235
  }

  if ( b  > height) {
	b = 36
  }
  
  if (dist( x, y, a, b) < 47 + 15) {
	score = score + 1
 }
  if (score > 100 && level == 1) {
    enemyCount = enemyCount + 5
    level = 2
    }
  if (score > 200 && level == 2) {
    d = [ 635 , 254 , 689 , 545, 238, 128, 356, 210, 485,] 
    speed = speed + 5
    my_speed = my_speed + 7
    level = 3
  }




  
  
  for (i=0; i<enemyCount; i=i+1) {

    if (dist( c[i], d[i], x, y) < 50 + 15) {
      score = score - 1
    }

    fill(251, 36, 255)
    circle(c[i], d[i], 50 )
    c[i] = c[i] + speed
    if (c[i] > width) {
      c[i] = 0
    }
    
  }
    
  time = time - 0.015
    
  }

  else {
  MUI.innerHTML = "Name? <input id=DB><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>All-time leaderboard</button>()"
  noLoop()
  
}

}


	function restart() { 
        let DB = document.getElementById("DB")
		name = DB.value 
		database.ref(name).set(score)		
		if (name != "") { 
			scoreboard[name] = score
		}
		alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
        score = 0
        enemyCount = 5
        level = 1
        speed = 5
        my_speed = 5
        time = 30
		loop()
		MUI.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
