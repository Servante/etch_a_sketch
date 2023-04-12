

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

let cells = document.querySelectorAll('.cell');

// let clickEvent = () => {
//   console.log("hover");
// }

cells.forEach((cell) => {
  cell.addEventListener('mousedown', function(event) {
    event.target.style.backgroundColor = "black";
  });
});



// https://stackoverflow.com/questions/68470917/how-to-draw-via-mouse-click-without-using-the-canvas-element