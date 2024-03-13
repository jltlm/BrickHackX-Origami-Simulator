import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

class Edge {
    constructor(vec1, vec2) {
        this.v1 = vec1;
        this.v2 = vec2;
    }
}
// later on, perhaps use edges- containing the equation for the fold line


class Graph {
    constructor() {
        const c1 = new Vertex(-PAPERWIDTH/2, PAPERHEIGHT/2);
        const c2 = new Vertex(PAPERWIDTH/2, PAPERHEIGHT/2);
        const c3 = new Vertex(PAPERWIDTH/2, -PAPERHEIGHT/2);
        const c4 = new Vertex(-PAPERWIDTH/2, -PAPERHEIGHT/2);
        this.vertices = new Map();
        this.vertices.set(c1, [c2, c4]);
        this.vertices.set(c2, [c1, c3]);
        this.vertices.set(c3, [c2, c4]);
        this.vertices.set(c4, [c1, c3]);

        const e1 = new Edge(c1, c2);
        const e2 = new Edge(c2, c3);
        const e3 = new Edge(c3, c4);
        const e4 = new Edge(c1, c4);

        this.edges = new Set();
        this.edges.add(e1);
        this.edges.add(e2);
        this.edges.add(e3);
        this.edges.add(e4);
    }

    getVertices() {
        return this.vertices;
    }

    addVertex(x, y) {
        this.vertices.set(new Vertex(x*PAPERWIDTH/2, y*PAPERHEIGHT/2), []);
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
const camera = new THREE.OrthographicCamera(-.01 * window.innerWidth, .01 * window.innerWidth, -.01 * window.innerHeight, .01 * window.innerHeight, 0, 2000);

document.getElementById("topViewButton").addEventListener("click", camera.position.set(0, 0, 1));
// camera.addEventListener("click", function () {
//     camera.position.getComponent(0);
//     camera.position.set(camera.position.getComponent(0)+=1, 0, 0)
// })

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor( 0xffffff, 0);

const papergeo = new THREE.PlaneGeometry(PAPERWIDTH, PAPERHEIGHT);
const papermat = new THREE.MeshBasicMaterial( {color: 0xb8cad9, side: THREE.DoubleSide});
const paper = new THREE.Mesh( papergeo, papermat );

// const papergeo = new THREE.BufferGeometry();
// const paperCorners = new Float32Array( [
// 	-PAPERWIDTH/2, -PAPERHEIGHT/2,  0, // v0
// 	PAPERWIDTH/2, -PAPERHEIGHT/2,  0, // v1
//     PAPERWIDTH/2, PAPERHEIGHT/2,  0, // v2
//     -PAPERWIDTH/2, PAPERHEIGHT/2,  0, // v3
// ] );
// const indices = [
// 	0, 1, 2, 4
// ];

// papergeo.setIndex( indices );
// papergeo.setAttribute( 'position', new THREE.BufferAttribute( paperCorners, 3 ) );

// const paperMat = new THREE.MeshBasicMaterial( { color: 0xb8cad9 } );
// const mesh = new THREE.Mesh( papergeo, paperMat );

// scene.add(mesh);

scene.add( paper );
const controls = new OrbitControls( camera, renderer.domElement );

let mousex = 
addEventListener("click", (event) => {

});

/**
 * creates new planes
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */
function fold(x1, y1, x2, y2) {

}

function drawBorders() {
    graph.edges.forEach((edge) => {
        const path = new THREE.Path();
        path.moveTo( edge.v1.x, edge.v1.y );
        path.lineTo( edge.v2.x, edge.v2.y );
        
        const points = path.getPoints();

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color: 0x000000} );

        const line = new THREE.Line( geometry, material );
        line.computeLineDistances();
        scene.add( line );
    })
}

drawBorders()

function drawVertices() {
    graph.edges.forEach((edge) => {
        const path = new THREE.Path();
        path.moveTo( edge.v1.x, edge.v1.y );
        path.lineTo( edge.v2.x, edge.v2.y );
        
        const points = path.getPoints();

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineDashedMaterial( {
            color: 0x000000,
            dashSize: .5,
            gapSize: 1
        } );

        const line = new THREE.Line( geometry, material );
        line.computeLineDistances();
        scene.add( line );
    })
}

// if something happens, draw vertices

// let raycaster = THREE.Raycaster();

function animate() {

	requestAnimationFrame( animate );
	controls.update();
    
	renderer.render( scene, camera );

}

animate();
