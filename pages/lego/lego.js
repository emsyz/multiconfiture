import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();
const legoObjects = [];
const meshRaycasts = [];

let collisionCounter = 0;

const addLegoToScene = (path) => {
  gltfLoader.load(`/3D/mesh/lego_resolved/${path}.gltf`, (gltf) => {
    const lego = gltf.scene.children[0];
    lego.receiveShadow = true;
    lego.castShadow = true;

    lego.position.set(Math.random() * 10 - 5, 2, 0);

    scene.add(lego);
    legoObjects.push(lego);
  });
};

["head", "body", "neck", "backleg", "frontleg"].forEach(addLegoToScene);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;

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
camera.position.set(0, 2, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.addEventListener("mousedown", onDocumentMouseDown);
document.addEventListener("mousemove", onDocumentMouseMove);
document.addEventListener("mouseup", onDocumentMouseUp);

function onDocumentMouseDown(event) {
  event.preventDefault();

  const intersects = raycaster.intersectObjects(legoObjects);

  if (intersects.length > 0) {
    selectedObject = intersects[0].object;
  }
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  if (selectedObject) {
    const ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);

    // Use a larger range for the intersection
    const intersection = ray.intersectObjects(legoObjects, true);

    if (intersection.length > 0) {
      const newPosition = intersection[0].point;

      // Check if the selected object is the first lego model and if its x-coordinate is within the specified range
      if (
        legoObjects.indexOf(selectedObject) === 0 &&
        newPosition.x >= 0 &&
        newPosition.x <= 1
      ) {
        // Lock the x-coordinate to be within the specified range
        selectedObject.position.x = Math.min(Math.max(newPosition.x, 0), 1);
      } else {
        // Allow movement for other objects or outside the specified range
        selectedObject.position.x = newPosition.x;
      }

      selectedObject.position.y = newPosition.y + 0.1;
      selectedObject.position.z = 0;
    }
  }
}

function onDocumentMouseUp(event) {
  event.preventDefault();
  selectedObject = null;

  // Check for collisions after releasing the mouse
  checkCollisions();
}

function checkCollisions() {
  let newCollisionCounter = 0;

  for (let i = 0; i < legoObjects.length; i++) {
    for (let j = i + 1; j < legoObjects.length; j++) {
      const object1 = legoObjects[i];
      const object2 = legoObjects[j];

      const distance = object1.position.distanceTo(object2.position);

      // You can adjust the threshold distance for collision as needed
      if (distance < 0.5) {
        // Objects are considered collided
        newCollisionCounter++;
      }
    }
  }

  if (newCollisionCounter > 0) {
    // At least one collision detected in the current check
    collisionCounter += newCollisionCounter;

    checkWinCondition();
  } else {
    // No collisions in the current check, decrement the counter by 1
    collisionCounter = Math.max(0, collisionCounter - 1);
  }

  console.log(`Collision Count: ${collisionCounter}`);
}

const checkWinCondition = () => {
  if (collisionCounter >= 5) {
    console.log("You win!");
  }
};

const clock = new THREE.Clock();
let previousTime = 0;

const performRaycasting = () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(legoObjects);

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "auto";
  }
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  performRaycasting();

  for (let i = 0; i < meshRaycasts.length; i++) {
    if (legoObjects.length > i) {
      meshRaycasts[i].position.copy(legoObjects[i].position);
    }
  }

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
