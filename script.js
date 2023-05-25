// Create title
const title = document.createElement('div');
title.textContent = 'Etch a Sketch';
title.style.fontSize = '70px';
title.style.width = '100%';
title.style.height = '100px';
document.body.appendChild(title);

// Create parent div rightPanel and leftPanel
const main = document.createElement('div');
main.classList.add('main');
main.style.width = '100%';
main.style.height = '700px';
document.body.appendChild(main);

// Create leftPanel
const colorButtons = document.createElement('div');
colorButtons.classList.add('leftPanel');
main.appendChild(colorButtons);

// Create black button
const blackButton = createColorButton('Black', 'black');
colorButtons.appendChild(blackButton);

// Create rainbow button
const rainbowButton = createColorButton('Rainbow', 'rainbow');
colorButtons.appendChild(rainbowButton);

// Create eraser button
const eraserButton = createColorButton('Eraser', 'eraser');
colorButtons.appendChild(eraserButton);

// Create rightPanel
const rightPanel = document.createElement('div');
rightPanel.classList.add('rightPanel');
rightPanel.style.width = ' 600px';
rightPanel.style.height = '700px';
main.appendChild(rightPanel);

// Create parent div for input field and create grid button
const gridControls = document.createElement('div');
gridControls.classList.add('gridSizeButtonContainer');
rightPanel.appendChild(gridControls);

// Create grid button
const button = document.createElement('button');
button.textContent = 'Create Grid';
button.style.fontSize = '18px';
button.style.width = '150px';
button.style.height = '45px';
button.addEventListener('click', createGrid);
gridControls.appendChild(button);

// Create input field
const input = document.createElement('input');
input.type = 'number';
input.id = 'grid-size';
input.min = '1';
input.max = '100';
input.style.fontSize = '18px';
input.style.width = '200px';
input.style.height = '45px';
input.placeholder = 'Enter grid size (1-100)';
gridControls.appendChild(input);

// Function to create a color button
function createColorButton(label, colorOption) {
  const button = document.createElement('button');
  button.textContent = label;
  button.style.fontSize = '18px';
  button.style.width = '130px';
  button.style.height = '45px';
  button.addEventListener('click', function () {
    handleColorSelection(colorOption);
  });
  return button;
}

// Function to handle color selection
function handleColorSelection(color) {
  selectedColor = color;
}

// Create the grid container
const container = document.createElement('div');
container.className = 'grid-container';
container.style.width = '600px';
container.style.height = '600px';
container.style.overflow = 'auto';
container.style.display = 'grid';
container.style.border = '1px solid black';
rightPanel.appendChild(container);

let selectedColor = 'black';

// Function to create the grid based on user input
function createGrid() {
  const gridSize = parseInt(input.value);
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert('Please enter a valid grid size between 1 and 100.');
    return;
  }

  // Clear the existing grid
  container.innerHTML = '';

  // Set the grid template columns and rows
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // Create grid cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.style.border = '1px solid lightgray';
    cell.style.backgroundColor = 'white';

    // Store the original color of the cell
    cell.dataset.originalColor = 'white';
    cell.dataset.originalBorderColor = 'lightgray';

    container.appendChild(cell);
  }

  // Add event listeners to the grid container
  container.addEventListener('click', handleCellClick);
  container.addEventListener('mousedown', handleCellMouseDown);
}

// Function to handle the cell click event
function handleCellClick(event) {
  const cell = event.target;
  if (cell.classList.contains('grid-cell')) {
    handleCellColor(cell);
  }
}

// Function to handle the cell mousedown event
function handleCellMouseDown(event) {
  const cell = event.target;
  if (cell.classList.contains('grid-cell')) {
    handleCellColor(cell);
    document.addEventListener('mousemove', handleCellMouseEnter);
    document.addEventListener('mouseup', handleCellMouseUp);
  }
}

// Function to handle the cell mousemove event
function handleCellMouseEnter(event) {
  const cell = event.target;
  if (cell.classList.contains('grid-cell') && event.buttons === 1) {
    handleCellColor(cell);
  }
}

// Function to handle the cell color change
function handleCellColor(cell) {
  const originalColor = cell.dataset.originalColor;
  const originalBorderColor = cell.dataset.originalBorderColor;

  if (selectedColor === 'eraser') {
    if (originalColor !== 'black') {
      cell.style.backgroundColor = originalColor;
      cell.style.border = `1px solid ${originalBorderColor}`;
    } else {
      cell.style.backgroundColor = '';
      cell.style.border = '1px solid lightgray';
    }
  } else if (selectedColor === 'rainbow') {
    const randomColor = getRandomColor();
    cell.style.backgroundColor = randomColor;
    cell.style.border = `1px solid ${randomColor}`;
  } else {
    cell.style.backgroundColor = selectedColor;
    cell.style.border = `1px solid ${selectedColor}`;
    cell.dataset.originalColor = selectedColor;
    cell.dataset.originalBorderColor = selectedColor;
  }
}



// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set the default grid size to 16x16
input.value = '16';

// Create the initial grid
createGrid();
