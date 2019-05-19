class WeightedQuickUnion {
  constructor(N) {
    this.N = N;
    this.parent = [];
    this.rank = [];
    for (let i = 0; i < this.N; i++) {
      this.parent.push(i);
      this.rank.push(0);
    }
  }

  root(node) {
    while (!(node == this.parent[node])) {
      node = this.parent[node];
    }
    return node;
  }

  connected(p, q) {
    return this.root(p) == this.root(q);
  }

  union(p, q) {
    let proot = this.root(p);
    let qroot = this.root(q);

    if (this.rank[proot] < this.rank[qroot]) {
      this.parent[proot] = qroot;
    } else if (this.rank[proot] > this.rank[qroot]) {
      this.parent[qroot] = proot;
    } else {
      this.parent[proot] = qroot;
      this.rank[qroot]++;
    }
  }
}
