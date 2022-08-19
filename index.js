let unitLength = 1;
const strokeColor = 50;
let ifContinue = true;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let noColor = true;
let randomNumber = [0 ,1];
let keyCodeX = 0;
let keyCodeY = 0;
let boxColor= 255;

//add 19/8 09:45
let trueperiod24gun = [
'.......................O..O................',
'.....................OOOOOO................',
'.................OO.O........O.............',
'.............OO.O.O.O.OOOOOOOO..O..........',
'...........OOO.OO...O.O.......OOO..........',
'..........O....OOO..O...O...OO.............',
'...........OOO...OO.OOOO.O...O.OO..........',
'............O.O...O.....O....O..O....OO.O..',
'..........O........O.OO..OO..OO.....O.OO.O.',
'..........OOOOO.OOOO.O....OOO.......O....O.',
'...............OO....O....O.OOO..OO.O.OO.OO',
'............OOOOO.OOO....OO.OO...O.O.O.O.O.',
'...........O.....OO....OO.O.OO.....O.....O.',
'............OOOOO......OO.O...O...O.O.OO.OO',
'OO.OO.........OO..O.....O.O....O..OOO.O.O..',
'.O.O.O.O.OO...OOO.O......O..O.O....OOO..O..',
'O..O.......O......OO...OOO........O.O.OO...',
'OOO..O....OO...........O..........O........',
'.....OOOO.O.................OO....OO.......',
'..OO.O......O..............O...O..OO.......',
'.O....O...O................O......OO.......',
'.OOO.O....O................O...O..O........',
'...........O..O...O.........OO....O.O.OO...',
'.OOO.O....O........OO...O..........OOO..O..',
'.O....O...O.......O......O........OOO.O.O..',
'..OO.O......O..........OOO........O.O.OO.OO',
'.....OOOO.O........................O.....O.',
'OOO..O....OO.....................O.O.O.O.O.',
'O..O.......O.........OO..........OO.O.OO.OO',
'.O.O.O.O.OO..........O........O.....O....O.',
'OO.OO.................OOO......O....O.OO.O.',
'........................O....OOO.....OO.O..',
]
let speedoflight = [
'..O..............O..................................O.....',
'O..O..OOO.......O.OOOO...............OO...........OO.O....',
'O..O............OOO.O.O.........O.....O.......O...O.......',
'.O.O..O.....................OOO..O.O.OOO.....O.O.O....O...',
'..OO......O....O................OOOOOO..O..O...O...O..O...',
'.O.O...OO.....O...OO......OO.OO..O..OO..O.O.OO..O.........',
'..O.....O.OO..O...OO......OO....O.O.O..O..O.O.O......OO..O',
'..O....OOO..O.........OOO.......OOO.O.OO.....O.......OOO.O',
'............OOOOOOOOO...O........OO.OOO...OOOO.........O.O',
'..........................................................',
'............OOOOOOOOO...O........OO.OOO...OOOO.........O.O',
'..O....OOO..O.........OOO.......OOO.O.OO.....O.......OOO.O',
'..O.....O.OO..O...OO......OO....O.O.O..O..O.O.O......OO..O',
'.O.O...OO.....O...OO......OO.OO..O..OO..O.O.OO..O.........',
'..OO......O....O................OOOOOO..O..O...O...O..O...',
'.O.O..O.....................OOO..O.O.OOO.....O.O.O....O...',
'O..O............OOO.O.O.........O.....O.......O...O.......',
'O..O..OOO.......O.OOOO...............OO...........OO.O....',
'..O..............O..................................O.....',
]
let ak94 = [
'.......O.......O.......OO.............',
'.......OOO.....OOO.....OO.............',
'..........O.......O...................',
'.........OO......OO................OO.',
'..............................OO..O..O',
'..............................O.O..OO.',
'.................................OO...',
'.....O............................O...',
'.....OOO..........................O.OO',
'........O......................OO.O..O',
'.......OO......................OO.OO..',
'......................................',
'......................................',
'.................O....................',
'..OO.OO.........O.O..........OO.......',
'O..O.OO........O...O.........O........',
'OO.O...........O...O..........OOO.....',
'...O...........O...O............O.....',
'...OO...........O.O...................',
'.OO..O.O.........O....................',
'O..O..OO..............................',
'.OO................OO.................',
'...................O..................',
'.............OO.....OOO...............',
'.............OO.......O...............',    
]

//add 19/8 09:45
let all = [trueperiod24gun, speedoflight, ak94]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// frameRate() - Speed of the game
let rectX = 0;
let fr = 30; //starting FPS //1st - let fr = 30;
let clr;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    let parent=document.getElementById("canvas")

    frameRate(fr); // Attempt to refresh at starting FPS
    /* Set the canvas to be under the element #canvas*/
    console.log(parent.offsetWidth,windowHeight)

    const canvas = createCanvas(parent.offsetWidth, windowHeight-256);
    canvas.parent(document.querySelector('#canvas'));

    console.log(width,height)
    unitLength=parent.offsetWidth/80
    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}
/**
* Initialize/reset the board state
*/

//add edit add pattern function
function init() {

    let pattern = generatePattern(speedoflight) //put pattern in the beginning
    let pattern1 = generatePattern(ak94)

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }

    printPattern(pattern,10,30)
    printPattern(pattern1,5,0)
}

function initRandomPattern() {

    let pattern = generatePattern(all[Math.floor(Math.random() * 3)]) //) //put pattern in the beginning
    
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }

    printPattern(pattern,10,10)
    
}

function initRandom() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        currentBoard[i][j] = random(randomNumber);
        nextBoard[i][j] = random(randomNumber);
        //每個格仔，assign value=0
      }
    }
    
  }

function draw() {
    if (ifContinue) {
        let speedSlider = document.querySelector(".slidecontainer input")
        // console.log(speedSlider.value);
        frameRate(parseInt(speedSlider.value));

        background(21, 153, 176);//background color  = dark torquoise canvas background
        generate();
        updateBoardColour()
    }
}
function updateBoardColour() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1 && nextBoard[i][j] ==1 ) {
                fill(0,124,133);
                } else if (currentBoard[i][j] == 1 && noColor) {
                fill(255);//box color  
                } else if (currentBoard[i][j] == 1 && !noColor) {
                fill(Math.floor(Math.random() *255),Math.floor(Math.random() *255),Math.floor(Math.random() *255));

            } else {
                fill(57, 55, 57); //dark grey circle
            }
            stroke(57, 55, 57); //dark grey circle
            circle(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}
function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            //adding 17/8/2022 17:51
            const inputOfSurvival = document.querySelector(".rulesOfSurvival input");
            const inputOfReproduction = document.querySelector(".rulesOfReproduction input");


            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < parseInt(inputOfSurvival.value)) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > parseInt(inputOfReproduction.value)) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

//add 19/8 09:55
function generatePattern(str) {
let result = [];

for (let i = 0; i < str.length; i++){ //columns
    let p = [];
    for (let j = 0; j < str[i].length; j++){  //row
            if (str[i][j] == "O") {
                p.push(1)
            } else if (str[i][j] == "."){
                p.push(0)
            }
        
        }
        result.push(p)
    }
    
    return result
}
//add 19/8 09:55
function printPattern (pattern,x,y) {
    for (let i = 0; i < pattern.length; i++){ //columns
        for (let j = 0; j < pattern[i].length; j++){  //row
            if (pattern[i][j] === 0) currentBoard[j + x][i + y] = 0;
                else currentBoard[j + x][i + y] = 1;
                nextBoard[j + x][i + y] = 0;
        }
    }
}










/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    console.log(mouseX)
    console.log(mouseY)
    currentBoard[x][y] = 1;
    fill(255);
    stroke(255);
    circle(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
* When mouse is pressed
*/
function mousePressed() {
    noLoop();
    mouseDragged();
}

/**
* When mouse is released
*/
function mouseReleased() {
    loop();
}
///////////////////////////////////////////////////
function keyPressed() {
    if (keyCode == 87) {
      noLoop();
      keyCodeY -= unitLength;
    } else if (keyCode == 83) {
      noLoop();
      keyCodeY += unitLength;
    } else if (keyCode == 65) {
      noLoop();
      keyCodeX -= unitLength;
    } else if (keyCode == 68) {
      noLoop();
      keyCodeX += unitLength;
    } else if (keyCode == 13) {
      loop();
      keyCodeX = 0;
      keyCodeY = 0;
    }
    if (keyCodeX > unitLength * columns || keyCodeY > unitLength * rows) {
      return;
    }

    const x = Math.floor(keyCodeX / unitLength);
    const y = Math.floor(keyCodeY / unitLength);
    currentBoard[x][y] = 1;
    fill("white");
    stroke("white");
    circle(x * unitLength, y * unitLength, unitLength);
  }




////////////////////////////////////////////////////
document.querySelector('#reset-game')
    .addEventListener('click', function () {
        init();
        updateBoardColour();
        ifContinue = true;

    });


document.querySelector('#pause-game')
    .addEventListener('click', function () {
        if (ifContinue) {
            ifContinue = false;
        }
    });

document.querySelector('#start-game')
    .addEventListener('click', function () {
        if (ifContinue == false) {
            ifContinue = true;
        }
    });

document.querySelector("#noColor")
    .addEventListener('click', function () {
        if (noColor) {
            noColor = false;
        }
        else 
            {
            noColor = true;
    }});    

    document.querySelector("#init-button").addEventListener("click", function () {
        updateBoardColour();
        initRandom();
        draw();
        ifContinue = true;
      });

      document.querySelector("#init-random-patterns").addEventListener("click", function () {
        updateBoardColour();
        initRandomPattern();
        draw();
        ifContinue = true;
      });