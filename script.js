// create grid 

const createGrid = function(x) {
  for(let r = 0; r < x; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for( c = 0; c < x; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      // cell.innerText = "cell";
      // cell.back
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

createGrid(16);

const getInput = function() {
  prompt("How many squares? (Please choose between 8 and 100)")
};


//caching DOM

const grid = document.getElementById("container");
const resize = document.getElementById("resize");
let cells = document.querySelectorAll(".cell");
let isDrawing = false;


// draw logic

cells.forEach((cell) => {
  cell.addEventListener('mouseover', function(event) {
    if(isDrawing == true) {
      event.target.style.backgroundColor = "black";
    };
  });
});

cells.forEach((cell) => {
  cell.addEventListener('mousedown', function(event) {
    isDrawing = true;
    event.target.style.backgroundColor = "black";
  });
});

cells.forEach((cell) => {
  cell.addEventListener('mouseup', function(event) {
    isDrawing = false;
  });
});

// resize 

// resize function

// -listens for click on resize button
// -prompts alert box asking for number of squares
// -calls resize grid with inputted data

const resizeGrid = function() {
  let input = getInput();
}


resize.addEventListener('mousedown', function(event) {
  getInput()});