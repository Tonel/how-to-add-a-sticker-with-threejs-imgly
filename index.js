import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(150, 100, 150);
new OrbitControls(camera, document.body);

// initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add light to the scene to make the texture visible
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// add the axes helper indicator to the scene
scene.add(new THREE.AxesHelper(20));

// load the base texture
const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');

// create a new buffer geometry and place it
// to the horizontal plane
const textureGeometry = new THREE.PlaneGeometry(50, 50);
textureGeometry.rotateX(-90 * THREE.MathUtils.DEG2RAD);
// translate the plane to the center of the scene
textureGeometry.translate(25, 0, 25);

// create a MeshBasicMaterial with the base texture
const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });

// create a mesh using the geometry and material
// and add it to the scene
const textureMesh = new THREE.Mesh(textureGeometry, textureMaterial);
scene.add(textureMesh);

// repeat the same logic to place the sticker image
// over the texture
const sticker = new THREE.TextureLoader().load('https://i.imgur.com/IYh17Rv.png');

const stickerGeometry = new THREE.PlaneGeometry(20, 20);
stickerGeometry.rotateX(-90 * THREE.MathUtils.DEG2RAD);
stickerGeometry.translate(25, 0, 25);
const stickerMaterial = new THREE.MeshBasicMaterial({ map: sticker, transparent: true });
// create a mesh using the image geometry and material
const imageMesh = new THREE.Mesh(stickerGeometry, stickerMaterial);
scene.add(imageMesh);

// adjust the position and rotation of the sticker mesh
// by setting the z-coordinate to 1
// in order for the sticker to rest on the texture
imageMesh.position.set(0, 1, 0);

// render the scene
function launchThreeJs() {
  requestAnimationFrame(launchThreeJs);
  renderer.render(scene, camera);
}

launchThreeJs();
