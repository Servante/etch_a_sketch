


const createGrid = function(x) {
  for(let r = 0; r < x; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for( c = 0; c < x; c++) {
      const cell = document.createElement("cell");
      cell.className = "cell";
      cell.innerText = "cell";
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

createGrid(16);