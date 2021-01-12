  /** 
   *
   * Storing all variables into a group so they can be changed with the GUI
   *
   */

  let config = {
      numOfMols: 10,
      numCols: 3,
      numRows: 3,
      showText: true,
      loopState: true,
      lineState: false,
      gridState: false,
      molColor: [255, 0, 0],
      intersectColor: [0, 255, 0],
      bgColor: [20, 20, 20],
      minMolSize: 8,
      maxMolSize: 25,
      minMolSpeed: -10,
      maxMolSpeed: 4
  }

  let gui = new dat.gui.GUI();

  gui.remember(config);

  section01 = gui.addFolder('Text & lines');

  section01.add(config, 'showText');

  section01.add(config, 'loopState')
      .onChange(function () {
          checkLoop();
      });

  section01.add(config, 'lineState')
      .onChange(function () {
          redraw();
      });

  section01.add(config, 'gridState')
      .onChange(function () {
          draw()
      });


  section02 = gui.addFolder('Mols, rows & cols')

  section02.add(config, 'numOfMols')
      .min(10)
      .max(100)
      .step(10)
      .onChange(function () {
          repopulateArray();
      });

  section02.add(config, 'numRows')
      .min(1)
      .max(10)
      .step(1)
      .onChange(function () {
          gridRedraw()
      });

  section02.add(config, 'numCols')
      .min(1)
      .max(10)
      .step(1)
      .onChange(function () {
          gridRedraw()
      });


  // section03 = gui.addFolder('Controls')

  //  section03.add(config, 'minMolSize', 5, 25);

  //  section03.add(config, 'maxMolSize', 20, 50);

  //  section03.add(config, 'minMolSpeed', -10, 5);

  //  section03.add(config, 'maxMolSpeed', 10, 25);


  section03 = gui.addFolder('Colours')

  section03.addColor(config, 'molColor')
      .onChange(function () {
          refreshGui()

      });

  section03.addColor(config, 'intersectColor')
      .onChange(function () {
          refreshGui()
      });

  section03.addColor(config, 'bgColor')
      .onChange(function () {
          refreshGui()
      });