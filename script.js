let current_size = 16;
const grid = document.getElementById("container");
const resize = document.getElementById("resize");
const defaultButton = document.getElementById("default");
const darkenButton = document.getElementById("darken");
const rainbowButton = document.getElementById("rainbow");
const clear = document.getElementById("clear");
let def = true;
let darken = false;
let rainbow = false;


//event listeners for drawing mode buttons

defaultButton.addEventListener('click', function(event) {
  setMode(true, false, false);
});

darkenButton.addEventListener('click', function(event) {
  setMode(false, true, false);
});

rainbowButton.addEventListener('click', function(event) {
  setMode(false, false, true);
});


//setMode() - sets mode for default, darken and rainbow drawing options

function setMode(defaultMode, darkenMode, rainbowMode) {
  def = defaultMode;
  darken = darkenMode;
  rainbow = rainbowMode;
};


//addEventLIsteners() - loops through grid cells and attaches event listeners which apply 
//drawing logic. 

const addEventListeners = function() {
  let cells = document.querySelectorAll(".cell");
  let isDrawing = false;

  cells.forEach((cell) => {
    cell.addEventListener('mouseover', function(event) {
      if(isDrawing == true && def == true) {
        event.target.style.backgroundColor = "black";
      } else if(isDrawing == true && darken == true) {
        darkenCell(event);
      } else if(isDrawing == true && rainbow == true) {
        rainbowCell(event);
      };
    });

    cell.addEventListener('mousedown', function(event) {
      isDrawing = true;
      if(def == true) {
        event.target.style.backgroundColor = "black";
      } else if(darken == true) {
        darkenCell(event);
      } else if(rainbow == true) {
        rainbowCell(event);
      };
    });

    cell.addEventListener('mouseup', function(event) {
      isDrawing = false;
    });
  });
};


//createGrid() - creates a grid and adds event listeners 

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
};


//build default grid

createGrid(current_size);


//getInput() - requests user input and verifies if input is valid 

const getInput = function() {
  const isValidInput = function(input) {
    const  MIN_GRID_INPUT = 8;
    const MAX_GRID_INPUT = 100;

    return !isNaN(input) && input >= MIN_GRID_INPUT && input <= MAX_GRID_INPUT;
  };

  const updateCurrent = function(input) {  
    current_size = input;
  };

  let input = parseInt(prompt("How many squares? (Please choose between 8 and 100)"));
  if(isValidInput(input) == true) {
    updateCurrent(input);
    return input; 
  }else {
    alert("Please enter a number between 8 and 100");
    return getInput();
  };
};


//resizeGrid() - clears the grid and then creates a new one with a grid size determined by 
//user input.

const resizeGrid = function() {
  clearGrid();
  createGrid(getInput());
};

resize.addEventListener('click', function(event) {
  resizeGrid();
});


//clearGrid() - erases grid and creates a new one

const clearGrid = function() {
  grid.innerHTML = '';
}

clear.addEventListener('click', function(event) {
  clearGrid();
});


// darkenCell() - darken cells by adding 25.5 to each RGB number with every mouseover

const darkenCell = function(event) {
  const currentColor = getComputedStyle(event.target).backgroundColor;

  const rgbMatch = currentColor.match(/\d+/g);
  const red = parseInt(rgbMatch[0]);
  const green = parseInt(rgbMatch[1]);
  const blue = parseInt(rgbMatch[2]);

  const darkenedRed = Math.max(0, red - 25.5);
  const darkenedGreen = Math.max(0, green - 25.5);
  const darkenedBlue = Math.max(0, blue - 25.5);

  event.target.style.backgroundColor = `rgb(${darkenedRed}, ${darkenedGreen}, ${darkenedBlue})`;  
};


//rainbowCell - draws with a randomly selected color 

const rainbowCell = function(event) {
  const getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const newRed = getRandom(1, 255);
  const newGreen = getRandom(1, 255);
  const newBlue = getRandom(1, 255);
  
  event.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
};


