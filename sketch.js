let w, h;
let L;
let lattice;
let sites;

function setup() {
  createCanvas(601, 601);
  // noCanvas();
  L = 30;
  w = floor(width / L);
  h = floor(height / L);
  lattice = new Percolation(L);
  sites = [];
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      sites.push([i, j]);
    }
  }
  shuffle(sites, true);

  // while (!lattice.percolates()) {
  //   let i = sites[0][0];
  //   let j = sites[0][1];
  //   sites.splice(0, 1);
  //   lattice.open(i, j);
  // }
  // console.log(lattice.getOpenedSites() / (L * L));
}

function draw() {
  background(255);
  let i = sites[0][0];
  let j = sites[0][1];
  sites.splice(0, 1);

  lattice.open(i, j);
  lattice.show();

  if (lattice.percolates()) {
    console.log(lattice.getOpenedSites() / (L * L));
    noLoop();
  }
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
