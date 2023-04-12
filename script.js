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




//caching DOM

const grid = document.getElementById("container");
let cells = document.querySelectorAll('.cell');
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