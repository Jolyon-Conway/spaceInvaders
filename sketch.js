let timer = 0;
let frame = 0;
let bullets = [];
let tempTimer = 0;
let alive = false;
let shields = [];
let enemies = [];
let enemy1;
let enemy2;
let enemy3;
let score = 0;
let enemyCount;
let bossArray = [];
let round = 0;
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
    enemy1 = loadImage("Images/enemy1.png");
    enemy2 = loadImage("Images/enemy2.png");
    enemy3 = loadImage("Images/enemy3.png");
    bossSprite = loadImage("Images/Boss.png");
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
    text("Round: " + round, 1150, 40);
  
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
            for (let i = bullets.length -1; i >= 0; i--) {
                bullets[i].move();
                if (bullets[i]) {
                    bullets[i].display();
                }
            }
        }
        //shields
        for (i = shields.length-1; i >= 0 ; i--) {
            for (j = shields[i].length -1 ; j >= 0; j--) {
                for (k = shields[i][j].length-1; k >= 0; k--) {
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
            for (j = 0; j < enemies[i].length; j++) {
                enemies[i][j].display();
                enemies[i][j].move();
                if (enemies[i][j].hitCheck()) {
                    enemies[i].splice(j, 1);
                    enemyCount -= 1;
                } else {
                    enemies[i][j].fire();
                }
            }
        }
        if (enemyCount == 0) {
            spawnEnemies();
            player.health += 1;
        }
        //boss
        if (Math.floor(Math.random() * 1000) == 476) {
            if (Math.floor(Math.random() * 2) == 0) {
                bossArray.push(new boss(-200, 50, "Right"));
            } else {
                bossArray.push(new boss(1680, 50, "Left"));
            }
        }
        for (i = bossArray.length -1; i >= 0; i--) {
            bossArray[i].display();
            bossArray[i].move();
            if (bossArray[i].hitCheck()) {
                bossArray.splice(i, 1);
            }
        }
        //frame
        frame = (frame + 1) % 1000;
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
            score = 0;
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
    enemies = [
        [new enemy(50, 100, 1)], [new enemy(120, 100, 1)], [new enemy(190, 100, 1)], [new enemy(260, 100, 1)], [new enemy(330, 100, 1)], [new enemy(400, 100, 1)], [new enemy(470, 100, 1)], [new enemy(540, 100, 1)], [new enemy(610, 100, 1)], [new enemy(680, 100, 1)], [new enemy(750, 100, 1)], [new enemy(820, 100, 1)], [new enemy(890, 100, 1)], [new enemy(960, 100, 1)], [new enemy(1030, 100, 1)], [new enemy(1100, 100, 1)], [new enemy(1170, 100, 1)],
        [new enemy(50, 160, 2)], [new enemy(120, 160, 2)], [new enemy(190, 160, 2)], [new enemy(260, 160, 2)], [new enemy(330, 160, 2)], [new enemy(400, 160, 2)], [new enemy(470, 160, 2)], [new enemy(540, 160, 2)], [new enemy(610, 160, 2)], [new enemy(680, 160, 2)], [new enemy(750, 160, 2)], [new enemy(820, 160, 2)], [new enemy(890, 160, 2)], [new enemy(960, 160, 2)], [new enemy(1030, 160, 2)], [new enemy(1100, 160, 2)], [new enemy(1170, 160, 2)],
        [new enemy(50, 220, 2)], [new enemy(120, 220, 2)], [new enemy(190, 220, 2)], [new enemy(260, 220, 2)], [new enemy(330, 220, 2)], [new enemy(400, 220, 2)], [new enemy(470, 220, 2)], [new enemy(540, 220, 2)], [new enemy(610, 220, 2)], [new enemy(680, 220, 2)], [new enemy(750, 220, 2)], [new enemy(820, 220, 2)], [new enemy(890, 220, 2)], [new enemy(960, 220, 2)], [new enemy(1030, 220, 2)], [new enemy(1100, 220, 2)], [new enemy(1170, 220, 2)],
        [new enemy(50, 280, 3)], [new enemy(120, 280, 3)], [new enemy(190, 280, 3)], [new enemy(260, 280, 3)], [new enemy(330, 280, 3)], [new enemy(400, 280, 3)], [new enemy(470, 280, 3)], [new enemy(540, 280, 3)], [new enemy(610, 280, 3)], [new enemy(680, 280, 3)], [new enemy(750, 280, 3)], [new enemy(820, 280, 3)], [new enemy(890, 280, 3)], [new enemy(960, 280, 3)], [new enemy(1030, 280, 3)], [new enemy(1100, 280, 3)], [new enemy(1170, 280, 3)],
        [new enemy(50, 340, 3)], [new enemy(120, 340, 3)], [new enemy(190, 340, 3)], [new enemy(260, 340, 3)], [new enemy(330, 340, 3)], [new enemy(400, 340, 3)], [new enemy(470, 340, 3)], [new enemy(540, 340, 3)], [new enemy(610, 340, 3)], [new enemy(680, 340, 3)], [new enemy(750, 340, 3)], [new enemy(820, 340, 3)], [new enemy(890, 340, 3)], [new enemy(960, 340, 3)], [new enemy(1030, 340, 3)], [new enemy(1100, 340, 3)], [new enemy(1170, 340, 3)],
    ]
    enemyCount = 85;
    frame = 0;
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
        spawnEnemies();
        round = 1;
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
        if (this.type == "player") {
            stroke(255);
            fill(255);
            rect(this.Xpos, this.Ypos, 2, 10);
        } else if (this.type == "enemy") {
            stroke(255);
            fill(255);
            rect(this.Xpos, this.Ypos, 2, 3);
            rect(this.Xpos +2, this.Ypos +3, 2, 4);
            rect(this.Xpos, this.Ypos +7, 2, 3);
        }
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
            image(enemy1, this.XPos, this.YPos, 40, 40);
        } else if (this.type == 2) {
            image(enemy2, this.XPos, this.YPos, 40, 40);
        } else if (this.type == 3) {
            image(enemy3, this.XPos, this.YPos, 40, 40);
        }
    }

    move() {
        if (frame < 250) {
            this.XPos += 1;
        } else if (frame < 500) {
            this.YPos += 0.144;
        } else if (frame < 750) {
            this.XPos -= 1;
        } else if (frame < 1000) {
            this.YPos -= 0.12;
        }
        if (this.YPos > 590) {
            player.health = 0;
        }
    }
    hitCheck() {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].type == "player") {
                if (bullets[i].Xpos > this.XPos && bullets[i].Xpos < this.XPos + 40 && bullets[i].Ypos > this.YPos && bullets[i].Ypos < this.YPos + 40) {
                    bullets.splice(i, 1);
                    score += 50;
                    return true;
                }
            }
        }
    }
    fire() {
        let temp = Math.floor(Math.random() * 1000);
        if (temp == 27) {
            bullets.push(new bullet(this.XPos +20, this.YPos +40, "enemy"))
        }
    }

}

class boss {
    constructor(newXpos, newYpos, direction) {
        this.Xpos = newXpos;
        this.Ypos = newYpos;
        this.direction = direction;
    }

    display() {
        image(bossSprite, this.Xpos, this.Ypos, 137, 40)
    }

    move() {
        if (this.direction == "Right") {
            this.Xpos += 10;
        } else if (this.direction == "Left") {
            this.Xpos -=10;
        }
    }

    hitCheck() {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].type == "player") {
                if (bullets[i].Xpos > this.Xpos && bullets[i].Xpos < this.Xpos + 137 && bullets[i].Ypos > this.Ypos && bullets[i].Ypos < this.Ypos + 40) {
                    bullets.splice(i, 1);
                    score += 200;
                    return true;
                }
            }
        }
    }
}