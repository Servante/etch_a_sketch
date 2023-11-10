//caching the DOM


let current_size = 16;
const grid = document.getElementById("container");
const resize = document.getElementById("resize");
const darkenButton = document.getElementById("darken");
const clear = document.getElementById("clear");
let def = true;
let darken = false;
let rainbow = false;


//drawing logic and adding event listeners to cells

const addEventListeners = function() {
  let cells = document.querySelectorAll(".cell");
  let isDrawing = false;

  cells.forEach((cell) => {
    cell.addEventListener('mouseover', function(event) {
      if(isDrawing == true && def == true) {
        event.target.style.backgroundColor = "black";
      } else if (isDrawing == true && darken == true) {
        darkenCell(event)
      };
    });
  });
  
  cells.forEach((cell) => {
    cell.addEventListener('mousedown', function(event) {
      isDrawing = true;
      if(def == true) {
        event.target.style.backgroundColor = "black";
      } else if(darken == true) {
        darkenCell(event);
      };
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

const updateCurrent = function(input) {  //refactor to arrow
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

darkenButton.addEventListener('mousedown', function(event) {
  darken = true;
  def = false;
  rainbow = false;
});

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
}



//rainbow

