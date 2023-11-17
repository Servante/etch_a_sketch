//caching the DOM


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


//event listeners for mode buttons

defaultButton.addEventListener('click', function(event) {
  setMode(true, false, false);
});

darkenButton.addEventListener('click', function(event) {
  setMode(false, true, false);
});

rainbowButton.addEventListener('click', function(event) {
  setMode(false, false, true);
});


//function to set drawing mode

function setMode(defaultMode, darkenMode, rainbowMode) {
  def = defaultMode;
  darken = darkenMode;
  rainbow = rainbowMode;
};


//drawing logic and adding event listeners to cells

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
      } else if(raindbow == true) {
        rainbowCell(event);
      };
    });

    cell.addEventListener('mouseup', function(event) {
      isDrawing = false;
    });
  });
};

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
};


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

const updateCurrent = function(input) {  //refactor to arrow
  current_size = input;
};


//gets random number for rainbow function

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
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


//rainbow

const rainbowCell = function(event) {
  const newRed = getRandom(1, 255);
  const newGreen = getRandom(1, 255);
  const newBlue = getRandom(1, 255);

  event.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;

};


