import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

// import nunjucks from "nunjucks";

// nunjucks.configure("pages", {
//   autoescape: true
// });

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

const testCube2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const testCubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Replace with the desired color
const testCubeMesh2 = new THREE.Mesh(testCube2, testCubeMaterial2);
testCubeMesh2.position.x = -1.5;
testCubeMesh2.position.y = -0.1;
testCubeMesh2.position.z = 1.3;
scene.add(testCubeMesh2);

const testCube3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const testCubeMaterial3 = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Replace with the desired color
const testCubeMesh3 = new THREE.Mesh(testCube3, testCubeMaterial3);
testCubeMesh3.position.x = 1.2;
testCubeMesh3.position.y = 0.5;
testCubeMesh3.position.z = 0.4;
scene.add(testCubeMesh3);

const testCube4 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const testCubeMaterial4 = new THREE.MeshBasicMaterial({ color: 0xfff000 }); // Replace with the desired color
const testCubeMesh4 = new THREE.Mesh(testCube4, testCubeMaterial4);
testCubeMesh4.position.x = 2.2;
testCubeMesh4.position.y = 1;
testCubeMesh4.position.z = 2;
scene.add(testCubeMesh4);

// Baby Button
const justBornButton = document.querySelector(".justBornButton");
const smoothingFactorJustBorn = -4;
const babyButton = document.querySelector(".babyButton");
const smoothingFactorBaby = 1.5;
const childButton = document.querySelector(".childButton");
const smoothingFactorChild = 5;
const adoButton = document.querySelector(".adoButton");
const smoothingFactorAdo = -20;

const ALL_BUTTONS = [justBornButton, babyButton, childButton, adoButton];

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

/**
 * Camera POSITION
 */
camera.position.set(0, -1, 5);
camera.lookAt(0, -1.3, 0);

let isCameraAnimating = false;

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
  if (!isCameraAnimating) {
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
  }

  // Move justBornButton based on mouse position
  const justBornButtonX =
    ((mouse.x * sizes.width * 0.5) / 120) * smoothingFactorJustBorn;
  const justBornButtonY =
    ((mouse.y * sizes.height * -0.5) / 120) * smoothingFactorJustBorn;

  justBornButton.style.left = justBornButtonX + "px";
  justBornButton.style.top = justBornButtonY + "px";

  // Move babyButton based on mouse position
  const babyButtonX =
    ((mouse.x * sizes.width * 0.5) / 120) * smoothingFactorBaby;
  const babyButtonY =
    ((mouse.y * sizes.height * -0.5) / 120) * smoothingFactorBaby;

  babyButton.style.left = babyButtonX + "px";
  babyButton.style.top = babyButtonY + "px";

  // Move childButton based on mouse position
  const childButtonX =
    ((mouse.x * sizes.width * 0.5) / 120) * smoothingFactorChild;
  const childButtonY =
    ((mouse.y * sizes.height * -0.5) / 120) * smoothingFactorChild;

  childButton.style.left = childButtonX + "px";
  childButton.style.top = childButtonY + "px";

  // Move adoButton based on mouse position
  const adoButtonX = ((mouse.x * sizes.width * 0.5) / 120) * smoothingFactorAdo;
  const adoButtonY =
    ((mouse.y * sizes.height * -0.5) / 120) * smoothingFactorAdo;

  adoButton.style.left = adoButtonX + "px";
  adoButton.style.top = adoButtonY + "px";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Born ANIMATION
   */
  const lookAtTargetBorn = new THREE.Vector3(0, -1.3, 0);

  justBornButton.addEventListener("click", () => {
    isCameraAnimating = true;
    document.removeEventListener("mousemove", handleMouseMove);

    /**
     * ATTENTION
     */
    toggleAllButtons(false);
    // justBornButton.style.display = "none";
    // babyButton.style.display = "none";
    // childButton.style.display = "none";
    // adoButton.style.display = "none";

    gsap.to(camera.position, {
      duration: 2,
      x: -1.5,
      y: 0.2,
      z: 2,
      ease: "power2.inOut",
      onComplete: () => {
        /**
         * ATTENTION METTRE ISCAMERAANIMATING = FALSE EN SORTANT DU MINI JEU EST FINI
         */
        // isCameraAnimating = false;

        document.addEventListener("mousemove", handleMouseMove);
      },
    });

    // gsap.to(lookAtTargetBorn, {
    //   duration: 5,
    //   x: testCube2.position.x,
    //   y: testCube2.position.y,
    //   z: testCube2.position.z,
    //   ease: "power2.inOut",
    //   onUpdate: () => {
    //     camera.lookAt(lookAtTargetBorn);
    //   },
    // });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * baby ANIMATION
   */
  const lookAtTargetBaby = new THREE.Vector3(0, -1.3, 0);

  babyButton.addEventListener("click", () => {
    isCameraAnimating = true;
    document.removeEventListener("mousemove", handleMouseMove);

    /**
     * ATTENTION
     */
    toggleAllButtons(false);
    // justBornButton.style.display = "none";
    // babyButton.style.display = "none";
    // childButton.style.display = "none";
    // adoButton.style.display = "none";

    gsap.to(camera.position, {
      duration: 2,
      x: -1.5,
      y: 1.04,
      z: 1,
      ease: "power2.inOut",
      onComplete: () => {
        /**
         * ATTENTION METTRE ISCAMERAANIMATING = FALSE EN SORTANT DU MINI JEU EST FINI
         */
        // isCameraAnimating = false;

        document.addEventListener("mousemove", handleMouseMove);
      },
    });

    // gsap.to(lookAtTargetBorn, {
    //   duration: 5,
    //   x: testCube.position.x,
    //   y: testCube.position.y,
    //   z: testCube.position.z,
    //   ease: "power2.inOut",
    //   onUpdate: () => {
    //     camera.lookAt(lookAtTargetBaby);
    //   },
    // });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * child ANIMATION
   */
  const lookAtTargetChild = new THREE.Vector3(0, -1.3, 0);

  childButton.addEventListener("click", () => {
    isCameraAnimating = true;
    document.removeEventListener("mousemove", handleMouseMove);

    /**
     * ATTENTION
     */
    toggleAllButtons(false);
    // justBornButton.style.display = "none";
    // babyButton.style.display = "none";
    // childButton.style.display = "none";
    // adoButton.style.display = "none";

    gsap.to(camera.position, {
      duration: 2,
      x: 1.2,
      y: 0.6,
      z: 1,
      ease: "power2.inOut",
      onComplete: () => {
        /**
         * ATTENTION METTRE ISCAMERAANIMATING = FALSE EN SORTANT DU MINI JEU EST FINI
         */
        // isCameraAnimating = false;

        document.addEventListener("mousemove", handleMouseMove);
      },
    });

    // gsap.to(lookAtTargetChild, {
    //   duration: 5,
    //   x: testCube3.position.x,
    //   y: testCube3.position.y,
    //   z: testCube3.position.z,
    //   ease: "power2.inOut",
    //   onUpdate: () => {
    //     camera.lookAt(lookAtTargetChild);
    //   },
    // });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * ado ANIMATION
   */
  const lookAtTargetAdo = new THREE.Vector3(0, -1.3, 0);

  adoButton.addEventListener("click", () => {
    isCameraAnimating = true;
    document.removeEventListener("mousemove", handleMouseMove);

    /**
     * ATTENTION
     */

    toggleAllButtons(false);
    // justBornButton.style.display = "none";
    // babyButton.style.display = "none";
    // childButton.style.display = "none";
    // adoButton.style.display = "none";

    gsap.to(camera.position, {
      duration: 2,
      x: 2.1,
      y: 1.06,
      z: 2.7,
      ease: "power2.inOut",
      onComplete: () => {
        /**
         * ATTENTION METTRE ISCAMERAANIMATING = FALSE EN SORTANT DU MINI JEU EST FINI
         */
        // isCameraAnimating = false;
        setTimeout(() => {
          isCameraAnimating = false;
          toggleAllButtons(true);
        }, 3000);

        document.addEventListener("mousemove", handleMouseMove);
      },
    });

    // gsap.to(lookAtTargetChild, {
    //   duration: 5,
    //   x: testCubeMesh3.position.x,
    //   y: testCubeMesh3.position.y,
    //   z: testCubeMesh3.position.z,
    //   ease: "power2.inOut",
    //   onUpdate: () => {
    //     camera.lookAt(lookAtTargetChild);
    //   },
    // });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const handleMouseMove = (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
};

document.addEventListener("mousemove", handleMouseMove);

tick();

function toggleAllButtons(showsButtons) {
  let shownClass = "button-visible";
  let hiddenClass = "button-hidden";
  let displayNone = "display-none";
  if (showsButtons == undefined)
    showsButtons = ALL_BUTTONS[0].classList.contains(hiddenClass);
  for (let but of ALL_BUTTONS) {
    if (showsButtons) {
      but.classList.add(shownClass);
      but.classList.remove(hiddenClass, displayNone);
    } else {
      but.classList.add(hiddenClass);
      but.classList.remove(shownClass);
      setTimeout(() => {
        but.classList.add(displayNone);
      }, 400);
    }
  }
}
