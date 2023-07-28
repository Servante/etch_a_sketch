//caching the DOM

let current_size = 16;
const grid = document.getElementById("container");
const resize = document.getElementById("resize");
const clear = document.getElementById("clear");

//drawing logic and adding event listeners to cells

const addEventListeners = function() {
  let cells = document.querySelectorAll(".cell");
  let isDrawing = false;

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
}

// create grid 

const createGrid = function(x) {
  for(let r = 0; r < x; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for( c = 0; c < x; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
  addEventListeners();
}

//build default grid

createGrid(current_size);


//getInput

const getInput = function() {
  let input = prompt("How many squares? (Please choose between 8 and 100)");
  if(checkResponse(input) == true) {
    updateCurrent(parseInt(input));
    return parseInt(input); 
  }else {
    alert("Please enter a number between 8 and 100");
  };    
};

const checkResponse = function(input) {
  if(!isNaN(parseInt(input)) && parseInt(input) >= 8 && parseInt(input) <= 100) {
    return true;
  } else {
    return false;
  }
};

const updateCurrent = function(input) {
  current_size = input;
};

// resize function

const resizeGrid = function() {
  console.log("test");
  clearGrid();
  createGrid(getInput());
};

resize.addEventListener('mousedown', function(event) {
  resizeGrid()
});

//clear grid

const clearGrid = function() {
  grid.innerHTML = '';
  createGrid(current_size);
}

clear.addEventListener('mousedown', function(event) {
  clearGrid()
});

//darken

//rainbow

