let score = 0;
let timer = 0;
let bullets = [];
let tempTimer = 0;
let alive = false;
let shields = [];
let enemies = [];
function setup() {
    createCanvas(1480, 700);
    player = new player(740, 680, 5);
    frameRate(60);
    spawnEnemies();
}

function preload() {
    //load highscore
    highScore = parseInt(localStorage.getItem("highScore")) || 0;
    //load enemy sprites
    let enemy1 = loadImage("Images/enemy1.png");
    let enemy2 = loadImage("Images/enemy2.png");
    let enemy3 = loadImage("Images/enemy3.png");
}

function draw() {
    background(30,30,30);
    //scoreboard
    stroke(255);
    fill(255);
    line(0, 50, 1480, 50);
    textSize(32);
    text("Score: " + score, 10, 40);
    text("Health: " + player.health, 1320, 40);
    text("High Score: " + highScore, 600, 40);
  
    if (alive) {
        //player
        player.display();
        player.move();
        player.fire();
        player.hitCheck();
        if (player.health == 0) {
            alive = false;
            setHighScore();
        }
        //bullets
        if (bullets.length > 0) {
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].move();
                if (bullets.length > 0) {
                    bullets[i].display();
                }
            }
        }
        //shields
        for (i = 0; i < shields.length; i++) {
            for (j = 0; j < shields[i].length; j++) {
                for (k = 0; k < shields[i][j].length; k++) {
                    shields[i][j][k].display();
                    shields[i][j][k].hitCheck();
                }
            }
        }
        if (timer > 0) {
            timer -= 1;
        }

        //enemies
        for (i = 0; i < enemies.length; i++) {
            enemies[i].display();
        }
    } else {
        textSize(32);
        text("Press button to Start", 600, 350);
        if (mouseX > 725 && mouseX < 765 && mouseY > 250 && mouseY < 290) {
            colour = (100,100,100);
        } else {colour = 255}
        fill(colour);
        stroke(colour);
        rect(725, 250, 40, 40);
        fill(30,30,30);
        stroke(30,30,30);
        triangle(730, 252.5, 760, 270, 730, 287.5);
        if (mouseIsPressed && mouseX > 725 && mouseX < 765 && mouseY > 250 && mouseY < 290) {
            player.revive();
            alive = true;
        }
    }
}

function setHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

function resetShields() {
    shields = [
        [
            [new shield(158, 590, 3)],[new shield(158, 610, 3)],[new shield(158, 630, 3)],
            [new shield(139, 590, 3)],[new shield(139, 610, 3)],
            [new shield(120, 590, 3)],[new shield(120, 610, 3)],
            [new shield(101, 590, 3)],[new shield(101, 610, 3)],[new shield(101, 630, 3)],
    ],
        [
            [new shield(358, 590, 3)],[new shield(358, 610, 3)],[new shield(358, 630, 3)],
            [new shield(339, 590, 3)],[new shield(339, 610, 3)],
            [new shield(320, 590, 3)],[new shield(320, 610, 3)],
            [new shield(301, 590, 3)],[new shield(301, 610, 3)],[new shield(301, 630, 3)],
    ],
        [
            [new shield(558, 590, 3)],[new shield(558, 610, 3)],[new shield(558, 630, 3)],
            [new shield(539, 590, 3)],[new shield(539, 610, 3)],
            [new shield(520, 590, 3)],[new shield(520, 610, 3)],
            [new shield(501, 590, 3)],[new shield(501, 610, 3)],[new shield(501, 630, 3)],
    ],
        [
            [new shield(758, 590, 3)],[new shield(758, 610, 3)],[new shield(758, 630, 3)],
            [new shield(739, 590, 3)],[new shield(739, 610, 3)],
            [new shield(720, 590, 3)],[new shield(720, 610, 3)],
            [new shield(701, 590, 3)],[new shield(701, 610, 3)],[new shield(701, 630, 3)],
    ],
        [
            [new shield(958, 590, 3)],[new shield(958, 610, 3)],[new shield(958, 630, 3)],
            [new shield(939, 590, 3)],[new shield(939, 610, 3)],
            [new shield(920, 590, 3)],[new shield(920, 610, 3)],
            [new shield(901, 590, 3)],[new shield(901, 610, 3)],[new shield(901, 630, 3)],
    ],
        [
            [new shield(1158, 590, 3)],[new shield(1158, 610, 3)],[new shield(1158, 630, 3)],
            [new shield(1139, 590, 3)],[new shield(1139, 610, 3)],
            [new shield(1120, 590, 3)],[new shield(1120, 610, 3)],
            [new shield(1101, 590, 3)],[new shield(1101, 610, 3)],[new shield(1101, 630, 3)],
    ], 
        [
            [new shield(1358, 590, 3)],[new shield(1358, 610, 3)],[new shield(1358, 630, 3)],
            [new shield(1339, 590, 3)],[new shield(1339, 610, 3)],
            [new shield(1320, 590, 3)],[new shield(1320, 610, 3)],
            [new shield(1301, 590, 3)],[new shield(1301, 610, 3)],[new shield(1301, 630, 3)],
    ], 


    ]
}

function spawnEnemies() {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 10; j++) {
            enemies.push(new enemy(158 + (i * 200), 100 + (j * 50), 1));
        }
    }
}
// classes

class player {
    constructor(newXpos, newYpos, newHealth) {
        this.Xpos = newXpos;
        this.Ypos = newYpos;
        this.health = newHealth;
    }

    display() {
        stroke(255);
        fill(255);
        rect(this.Xpos, this.Ypos, 20, 20);
        rect(this.Xpos, this.Ypos, -20, 20);
        rect(this.Xpos -2, this.Ypos -10, 4, 10);
    }
    move() {
        if (keyIsDown(16)) {
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                if (this.Xpos > 20){this.Xpos -= 1;}
            } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                if (this.Xpos < 1460){this.Xpos += 1;}
            }
        } else {
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                if (this.Xpos > 20){this.Xpos -= 5;}
            } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                if (this.Xpos < 1460){this.Xpos += 5;}
            }
        }
    }
    fire() {
        if (keyIsDown(32) && timer == 0) {
            bullets.push(new bullet(this.Xpos, this.Ypos, "player"));
            timer = 30;
        }
    }
    hitCheck() {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].type == "enemy") {
                if (bullets[i].Xpos > this.Xpos - 20 && bullets[i].Xpos < this.Xpos + 20 && bullets[i].Ypos > this.Ypos && bullets[i].Ypos < this.Ypos + 20) {
                    this.health -= 1;
                    bullets.splice(i, 1);
                }
            }
        }
    }
    revive() {
        this.Xpos = 740;
        this.Ypos = 680;
        this.health = 5;
        resetShields();
    }
}

class bullet {
    constructor(newXpos, newYpos, newType) {
        this.Xpos = newXpos;
        this.Ypos = newYpos;
        this.type = newType;
    }
    move() {
        if (this.type == "player") {
            this.Ypos -= 10;
            if (this.Ypos < 50) {
                bullets.splice(0, 1);
            }
        } else if (this.type == "enemy") {
            this.Ypos += 10;
            if (this.Ypos > 700) {
                bullets.splice(0, 1);
            }
        }
    }
    display() {
        stroke(255);
        fill(255);
        rect(this.Xpos, this.Ypos, 2, 10);
    }
}

class shield {
    constructor(newXpos, newYpos, newHealth) {
        this.Xpos = newXpos;
        this.Ypos = newYpos;
        this.health = newHealth;
    }
    display() {
        if (this.health == 3) {
            colour = "green";
        } else if (this.health == 2) {
            colour = "yellow";
        } else if (this.health == 1) {
            colour = "red";
        } else if (this.health == 0) {
            this.Xpos = -100;
        }
        stroke(colour);
        fill(colour);
        rect(this.Xpos, this.Ypos, 20, 20);
    }
    hitCheck() {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].Xpos > this.Xpos && bullets[i].Xpos < this.Xpos + 20 && bullets[i].Ypos > this.Ypos && bullets[i].Ypos < this.Ypos + 20) {
                this.health -= 1;
                bullets.splice(i, 1);
            }
        }
    }
}

class enemy {
    //got here needs fixing
    constructor(newXPos, newYPos, newType) {
        this.XPos = newXPos;
        this.YPos = newYPos;
        this.type = newType;
    }

    display() {
        stroke(255);
        if (this.type == 1) {
            image(enemy1, this.Xpos, this.Ypos, 40, 40);
        } else if (this.type == 2) {
            image(enemy2, this.Xpos, this.Ypos, 40, 40);
        } else if (this.type == 3) {
            image(enemy3, this.Xpos, this.Ypos, 40, 40);
        }
    }
}