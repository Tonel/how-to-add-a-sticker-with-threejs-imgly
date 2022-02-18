// initializing the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// initializing a Three.js scene
const scene = new THREE.Scene();

// seting up a Three.hs PerspectiveCamera + its OrbitControls
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(150, 100, 150);
const controls = new THREE.OrbitControls(camera, document.body);

// adding light to the scene to make the texture visible
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// adding the axes helper indicator to the scene
scene.add(new THREE.AxesHelper(20));

// initializing the Three.js texteure loader
const loader = new THREE.TextureLoader();

// crating a new buffer geometry and placing it
// to the horizontal plane
var geometry = new THREE.PlaneBufferGeometry(50, 50);
geometry.rotateX(-90 * THREE.Math.DEG2RAD);
// translating the plane to the center of the scene
geometry.translate(25, 0, 25);

const texturePath =
  "https://threejs.org/examples/textures/hardwood2_diffuse.jpg";

const stickerPath = "https://i.imgur.com/IYh17Rv.png";

// adding a sticker to a texture material
// with onBeforeCompile
var material = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,

  map: loader.load(texturePath),

  bumpMap: loader.load(texturePath),

  onBeforeCompile: function (shader) {
    // adding the sticker
    // https://github.com/Fyrestar/THREE.extendMaterial#patching-shader-code
    THREE.patchShader(shader, {
      header: "uniform sampler2D tDecal; uniform vec4 uDecal;",

      fragment: {
        "#include <fog_fragment>": `
          vec2 offset = uDecal.xy + vUv / uDecal.zw;
          vec4 c = texture2D(tDecal, offset);
          gl_FragColor = mix(gl_FragColor, c, c.a);
         `
      },

      uniforms: {
        uDecal: new THREE.Vector4(-0.15, -0.15, 0.8, 0.8),
        tDecal: loader.load(stickerPath)
      }
    });
  }
});

// adding the Three.js Mesh to the scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function launchThreeJs() {
  requestAnimationFrame(launchThreeJs);
  renderer.render(scene, camera);
}

launchThreeJs();
