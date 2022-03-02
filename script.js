var grid = [];
var isRev = [];
var isFlagged = [];
var w, h;
var numMines;
var loser = 0;



function setup() {
    w = 13;
    h = 13;
    numMines= 30;


    for (var i=0; i<h; i++) {
        grid[i] = [];
        isRev[i] = [];
        isFlagged[i] = [];
        for (var j=0; j<w; j++) {
            grid[i][j] = 0;
            isRev[i][j] = false;
            isFlagged[i][j] = false;
        }
    }
    var ctr = 0;
    console.log(ctr);
    while (ctr < numMines) {
        var cIndex = (int)(Math.random() * w);
        var rIndex = (int)(Math.random() * h);
        if (grid[rIndex][cIndex] != -1) {
            grid[rIndex][cIndex] = -1;
            ctr++;
        }
    }
    for(var i=0; i<h; i++) {
        for (var j=0; j<w; j++) {
            for (var x=i-1; x<i+2; x++) {
                for (var y=j-1; y<j+2; y++) {
                    if (x>=0 && y>=0 && x<h && y<w && grid[i][j] != -1 && grid[x][y] == -1) {
                        grid[i][j]++;
                    }
                }
            }
        }
    }


    
    createCanvas(50*h, 50*w);
    
}

function pwer() {
    fill(255);
    strokeWeight(1);
    stroke(255);
    textSize(10);
    for (var i=0; i<h; i++) {
        strokeWeight(1);
        stroke(255);
        line(0, 50*i, 50*w, 50*i);
        for (var j=0; j<w; j++) {
            noStroke();
            text(grid[i][j], 50*i+24,50*j+26);
        }
    }
    strokeWeight(1);
    stroke(255);
    for (var i=0; i<w; i++) {
        line(50*i, 0, 50*i, 50*h);
    }
}

function drawGrid() {
    for (var i=0; i<h; i++) {
        for (var j=0; j<w; j++) {
            if (isRev[i][j]) {
                if (grid[i][j] != 0) {
                    fill(255);
                    text(grid[i][j], 50*i+24, 50*j+26);
                } else {}
            } else {
                fill(0);
                rect(50*i+1, 50*j+1, 48, 48);
                if (isFlagged[i][j]) {
                    fill(255);
                    ellipse(50*i+26, 50*j+26, 10, 10)
                }
            }
        }
    }
}

function processInputL(x, y) {
    var rIndex = (int)(x/50);
    var cIndex = (int)(y/50);
    if (isRev[rIndex][cIndex]) {
        processInputC(x, y);
    }
    if (grid[rIndex][cIndex] == -1 && !(isFlagged[rIndex][cIndex])) {
        loser = -1;
    } else if (!(isFlagged[rIndex][cIndex])){
        reveal(rIndex, cIndex);
    } else {}
}

function processInputC(x, y) {
    var r = (int)(x/50);
    var c = (int)(y/50);
    if (isRev[r][c]) {
        var ctr = 0;
        var youGonnaLoseCtr = 0;
        for (var i=r-1; i<r+2; i++) {
            for (var j=c-1; j<c+2; j++) {
                if (i >=0 && j >= 0 && i<h && j<w && isFlagged[i][j]) {
                    if (grid[i][j] != -1) {
                        youGonnaLoseCtr++;
                    }
                    console.log(youGonnaLoseCtr);

                    ctr++;
                }
            }
        }
        if (ctr == grid[r][c] && youGonnaLoseCtr == 0) {
            for (var i=r-1; i<r+2; i++) {
                for (var j=c-1; j<c+2; j++) {
                    if (i >=0 && j >= 0 && i<h && j<w && !(isRev[i][j])) {
                        reveal(i, j);
                    }
                }
            }
        } else if (youGonnaLoseCtr > 0){
            loser = -1;
        } else {}
    }
}

function processInputR(x, y) {
    var r = (int)(x/50);
    var c = (int)(y/50);
    if (!(isRev[r][c])) {
        if (!(isFlagged[r][c])) {
            isFlagged[r][c] = true;
        } else  {
            isFlagged[r][c] = false;
        }
    } else {}
}

function reveal(r, c) {
    if (grid[r][c] != -1) {
        isRev[r][c] = true;
        if (grid[r][c] == 0) {
            for (var i=r-1; i<r+2; i++) {
                for (var j=c-1; j<c+2; j++) {
                    if (i>=0 && j>=0 && i<h && j<w && (i != r || j != c) && !(isRev[i][j])) {
                        reveal(i, j);
                    }
                }
            }
        }
    }
}

function checkWin() {
    var ctr = 0;
    for (var i=0; i<h; i++) {
        for(var j=0; j<w; j++) {
            if (isRev[i][j]) {
                ctr++;
            }
        }
    }
    if (ctr == w*h-numMines) {
        loser = 1;
    }
}



function draw() {
    if (loser == 0) {
        background(10, 0, 80);
        fill(255);
        drawGrid();
        //pwer();
        checkWin();
    } 
    if (loser == -1) {
        background(255);
        fill(0);
        text("welcome to purgatory", 100, 100);
    }
    if (loser == 1) {
        background(255, 0, 255);
        text("wOw!", 100, 100);
    }
}

function mousePressed() {
    if (mouseButton == LEFT) {
        processInputL(mouseX, mouseY);
    } else if (mouseButton == CENTER) {
        processInputC(mouseX, mouseY);
    } else {
        processInputR(mouseX, mouseY);
    }
}
