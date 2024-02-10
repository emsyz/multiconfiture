import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();
const legoObjects = [];

const addLegoToScene = (path) => {
  gltfLoader.load(`/3D/mesh/lego_resolved/${path}.gltf`, (gltf) => {
    const lego = gltf.scene.children[0];
    lego.receiveShadow = true;
    lego.castShadow = true;
    scene.add(lego);
    legoObjects.push(lego);

    // Sort legoObjects array based on the object's name property
    legoObjects.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  });
};

["head", "neck", "body", "backleg", "frontleg"].forEach(addLegoToScene);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentIntersect = null;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("click", () => {
  if (currentIntersect) {
    const clickedObject = currentIntersect.object;

    const legoIndex = legoObjects.indexOf(clickedObject);
    if (legoIndex !== -1) {
      console.log(`Mouse enter ${legoIndex + 1}`);
    }
  }
});

const clock = new THREE.Clock();
let previousTime = 0;

const performRaycasting = () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(legoObjects);

  if (intersects.length > 0) {
    currentIntersect = intersects[0];
  } else {
    currentIntersect = null;
  }
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  controls.update();
  performRaycasting();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
