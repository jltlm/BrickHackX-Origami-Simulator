import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// class Edge {
//     constructor(vec1, vec2) {
//         this.v1 = vec1;
//         this.v2 = vec2;
//     }
// }
// later on, perhaps use edges- containing the equation for the fold line

// gate fold, petal fold, accordion fold, etc

class Graph {
    constructor() {
        const c1 = new Vertex(0, 0);
        const c2 = new Vertex(0, 1);
        const c3 = new Vertex(1, 1);
        const c4 = new Vertex(1, 0);
        this.vertices = new Map();
        this.vertices.set(c1, [c2, c4]);
        this.vertices.set(c2, [c1, c3]);
        this.vertices.set(c3, [c2, c4]);
        this.vertices.set(c4, [c1, c3]);

        // const e1 = new Edge(c1, c2);
        // const e2 = new Edge(c2, c3);
        // const e3 = new Edge(c3, c4);
        // const e4 = new Edge(c4, c1);

        // this.edges = new Map();
        // this.edges.set(c1, [e1, e4]);
    }

    getVertices() {
        return this.vertices;
    }

    addVertex(x, y) {
        this.vertices.set(new Vertex(x, y), []);
    }
}

class PaperPlanes {
    constructor(graph) {
        this.graph = graph;
        this.planes = new Set();
        
    }
}

const graph = new Graph();
const paperPlanes = new PaperPlanes(graph);

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-.02 * window.innerWidth, .02 * window.innerWidth, -.02 * window.innerHeight, .02 * window.innerHeight, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor( 0xffffff, 0);

const papergeo = new THREE.PlaneGeometry(10, 10, 20, 20);
const papermat = new THREE.MeshBasicMaterial( {color: 0xb8cad9, side: THREE.DoubleSide});
const paper = new THREE.Mesh( papergeo, papermat );
scene.add( paper );
const controls = new OrbitControls( camera, renderer.domElement );


/**
 * creates new planes
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */
function fold(x1, y1, x2, y2) {

}


for (key in graph.vertices) {
    const path = new THREE.Path();
    
    console.log(key.x + " " + key.y)
    path.lineTo( key.x, key.y );

    for (connected in graph.vertices.get(key)) {
        path.lineTo( key.x, key.y );

    }
    path.lineTo( 1, 1 );

    const points = path.getPoints();

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: 0x000000 } );

    const line = new THREE.Line( geometry, material );
    scene.add( line );
}


function animate() {

	requestAnimationFrame( animate );

	controls.update();
    // paper.rotation.x += .002;
    // paper.rotation.y += .002;
    paper.rotation.z += .002;


	renderer.render( scene, camera );

}

animate();
