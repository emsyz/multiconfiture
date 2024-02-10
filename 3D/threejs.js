import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Grid helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 3000;
directionalLight.shadow.mapSize.y = 3000;
directionalLight.shadowCameraLeft = -3000;
directionalLight.shadowCameraRight = 3000;
directionalLight.shadowCameraTop = 3500;
directionalLight.shadowCameraBottom = -3000;
directionalLight.position.set(0, 1, 20);
scene.add(directionalLight);

const targetObject = new THREE.Object3D();
targetObject.position.set(0, 0.6, 0);

directionalLight.target = targetObject;

scene.add(targetObject);

const helper = new THREE.DirectionalLightHelper(directionalLight, 2);
scene.add(helper);

/***
 * Models
 */

// ThreeJs Models

/**
 * Baby Periode
 */

// Baby cube
const testCube = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const testCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Replace with the desired color
const testCubeMesh = new THREE.Mesh(testCube, testCubeMaterial);
testCubeMesh.position.x = -1.5;
testCubeMesh.position.y = 1;
testCubeMesh.position.z = 0.3;
scene.add(testCubeMesh);

// Baby Button
const babyButton = document.querySelector(".babyButton");
const smoothingFactor = 1.5;

// Imported models
const gltfLoader = new GLTFLoader();
gltfLoader.load("./3D/mesh/room2.gltf", (gltf) => {
  const house = gltf.scene.children[0];
  house.receiveShadow = true;
  house.castShadow = true;

  scene.add(gltf.scene.children[0]);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, -1, 5);
camera.lookAt(0, -1.3, 0);

// scene.add(camera);

/**
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  // controls.update();

  // Update camera rotation based on mouse position
  camera.position.x = THREE.MathUtils.lerp(
    camera.position.x,
    (mouse.x * Math.PI) / 10,
    0.1
  );

  camera.position.y = THREE.MathUtils.lerp(
    (camera.position.y = 1.6),
    mouse.y * Math.PI * 1,
    0.1
  );

  // Move babyButton based on mouse position
  const babyButtonX = ((mouse.x * sizes.width * 0.5) / 120) * smoothingFactor;
  const babyButtonY = ((mouse.y * sizes.height * -0.5) / 120) * smoothingFactor;

  babyButton.style.left = babyButtonX + "px";
  babyButton.style.top = babyButtonY + "px";

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
