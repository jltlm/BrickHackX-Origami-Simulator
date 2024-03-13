let PAPERWIDTH = 10;
let PAPERHEIGHT = 10;

let FREEMODE = 1;
let SELECTMODE = 2;
let mode = FREEMODE;

class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Graph {
    constructor() {
        const c1 = new Vertex(-PAPERWIDTH/2, PAPERHEIGHT/2);
        const c2 = new Vertex(PAPERWIDTH/2, PAPERHEIGHT/2);
        const c3 = new Vertex(PAPERWIDTH/2, -PAPERHEIGHT/2);
        const c4 = new Vertex(-PAPERWIDTH/2, -PAPERHEIGHT/2);
        this.allVerts = new Set();
        this.allVerts.add(c1);
        this.allVerts.add(c2);
        this.allVerts.add(c3);
        this.allVerts.add(c4);
        this.vertices = new Map();
        this.vertices.set(c1, [c2, c4]);
        this.vertices.set(c2, [c1, c3]);
        this.vertices.set(c3, [c2, c4]);
        this.vertices.set(c4, [c1, c3]);

        // this is a stack
        this.folds = [];
    }

    getVertices() {
        return this.vertices;
    }

    addEdge(x1, y1, x2, y2) {
        let vert1 = new Vertex(x1, y1);
        let vert2 = new Vertex(x2, y2);

        this.allVerts.add(vert1);
        this.allVerts.add(vert2);

        // adds the connected edges to vertices
        if (!this.vertices.get(vert1)) {
            this.vertices.set(vert1, []);
        }
        if (!this.vertices.get(vert2)) {
            this.vertices.set(vert2, []);
        }
        
        // updates vertices they're connected to
        let vert1conns = this.vertices.get(vert1);
        vert1conns.push(vert2);
        let vert2conns = this.vertices.get(vert2);
        vert2conns.push(vert1);
        this.vertices.set(vert1, vert1conns);
        this.vertices.set(vert2, vert2conns);
    }

    addVertex(x, y) {
        this.vertices.set(new Vertex(x*PAPERWIDTH/2, y*PAPERHEIGHT/2), []);
    }
}


const graph = new Graph();

