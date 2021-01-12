 let molecules = [];
 let grid = [];
 let rowHeight, colWidth;

 function setup() {
     createCanvas(700, 700);
     rowHeight = 700 / config.numRows;
     colWidth = 700 / config.numCols;

     for (let i = 0; i < config.numOfMols; i++) {
         molecules.push(new Molecule(i));
         // i assigns an index number to each molecule so they can be differentiated in the array
     }
 }

 function draw() {
     background(config.bgColor);

     molecules.forEach((molecule) => {
         molecule.reset();
     });

     makeEmpty3DArray();
     populateArray();
     checkIntersections02();

     config.gridState ? drawGrid() : null;

     molecules.forEach((molecule) => {
         molecule.render();
         molecule.step();
     });
 }

 function checkIntersections02() {
     for (let j = 0; j < config.numRows; j++) {
         for (let i = 0; i < config.numCols; i++) {
             let molCollection = grid[j][i];
             checkIntersections(molCollection);
         }
     }
 }

 /** 
  *
  * Checks if molecule intersects another & changes colour
  *
  */

 function checkIntersections(_molecules) {
     for (let a = 0; a < _molecules.length; a++) {
         for (let b = a + 1; b < _molecules.length; b++) {
             let moleculeA = molecules[_molecules[a]];
             let moleculeB = molecules[_molecules[b]];

             if (config.lineState) {
                 stroke(125, 100);
                 line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
             };

             moleculeA.isIntersecting(moleculeB) ?
                 (moleculeA.changeColor(), moleculeB.changeColor()) :
                 null;
         }
     }
 }

 /** 
  *
  * An empty 3D array is created here so that the molecules can be pushed into it
  *
  */

 function makeEmpty3DArray() {
     grid = []; // reset the grid
     for (let j = 0; j < config.numRows; j++) {
         grid.push([]);
         for (let i = 0; i < config.numCols; i++) {
             grid[j].push([]);
         }
     }
 }

 function populateArray() {
     for (let j = 0; j < config.numRows; j++) {
         for (let i = 0; i < config.numCols; i++) {
             let temp = molecules.filter(molecule =>
                 molecule.position.x > (i * colWidth) &&
                 molecule.position.x < ((i + 1) * colWidth) &&
                 molecule.position.y > (j * rowHeight) &&
                 molecule.position.y < ((j + 1) * rowHeight)
             ).map(molecule => molecule.index);

             grid[j][i] = temp;
             checkIntersections(temp);
         }
     }
 }

 /** 
  *
  * Creates a grid with a nested for loop with user configurable variables,
  * so the number of grid rows & columns can be changed with the GUI
  *
  */

 function drawGrid() {
     noFill();
     stroke(230, 50);
     strokeWeight(2);

     for (let j = 0; j < config.numRows; j++) {
         for (let i = 0; i < config.numCols; i++) {
             rect(i * colWidth, j * rowHeight, colWidth, rowHeight)
         }
     }
 }

 /** 
  *
  * Boolean for the GUI controls to turn on/off the molecules movement on the canvas
  *
  */

 function checkLoop() {
     if (config.loopState) {
         loop();
     } else {
         noLoop();
     }
 }

 /** 
  *
  * Redraws the grid with the changes made to values
  *
  */

 function gridRedraw() {
     rowHeight = 700 / config.numRows;
     colWidth = 700 / config.numCols;
 }

 /** 
  *
  * Resets the GUI slider values to their initial values
  *
  */

 function refreshGui() {
     gui.__controllers.forEach(controller => controller.setValue(controller.initialValue));
 }

 /** 
  *
  * Recalculates the number of molecules and adds it to their initial values
  *
  */

 function repopulateArray() {
     molecules = [];
     createCanvas(700, 700);

     for (var i = 0; i < config.numOfMols; i++) {
         new Molecule(random(this.width), random(this.height), random(5, this.maxMolSize));
         molecules.push(new Molecule(i));
     }

 }