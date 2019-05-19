class Percolation {
  constructor(L) {
    this.L = L;
    this.sites = create2DArray(L, L);
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < L; j++) {
        this.sites[i][j] = false;
      }
    }
    this.uf = new WeightedQuickUnion(L * L + 2);
    this.top = L * L;
    this.bottom = L * L + 1;
    this.opened = 0;
  }

  getIndex(i, j) {
    return i + this.L * j;
  }

  isOpen(i, j) {
    return this.sites[i][j];
  }

  open(i, j) {
    if (!this.isOpen(i, j)) {
      let index = this.getIndex(i, j);
      this.sites[i][j] = true;
      this.opened++;

      if (j == 0) {
        this.uf.union(index, this.top);
      } else if (j == this.L - 1) {
        this.uf.union(index, this.bottom);
      }

      // Up
      if (i > 0 && this.isOpen(i - 1, j)) {
        this.uf.union(index, this.getIndex(i - 1, j));
      }

      // Down
      if (i < this.L - 1 && this.isOpen(i + 1, j)) {
        this.uf.union(index, this.getIndex(i + 1, j));
      }

      // Left
      if (j > 0 && this.isOpen(i, j - 1)) {
        this.uf.union(index, this.getIndex(i, j - 1));
      }

      // Right
      if (j < this.L - 1 && this.isOpen(i, j + 1)) {
        this.uf.union(index, this.getIndex(i, j + 1));
      }
    }
  }

  percolates() {
    return this.uf.connected(this.top, this.bottom);
  }

  getOpenedSites() {
    return this.opened;
  }

  show() {
    for (let i = 0; i < this.L; i++) {
      for (let j = 0; j < this.L; j++) {
        let x = i * w;
        let y = j * h;
        stroke(255);
        strokeWeight(3);
        if (this.L > 70) {
          strokeWeight(2);
        }
        if (this.sites[i][j]) {
          // Open site
          fill(color("#0a191e"));
          if (this.uf.connected(this.getIndex(i, j), this.top)) {
            // Open site connected to top
            fill(color("#4a9878"));
          }
        } else {
          // Closed site
          fill(color("#d8b65c"));
        }
        rect(x, y, w, h);
      }
    }
  }
}
