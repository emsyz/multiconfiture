import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

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

// const gridHelper = new THREE.GridHelper(size, divisions);
// scene.add(gridHelper);

// Lights
const ambientLight = new THREE.AmbientLight(0xbdbdbd, 1.1);
scene.add(ambientLight);

// DirectionnalLight
const directionalLight = new THREE.DirectionalLight(0x666666, 1);
directionalLight.castShadow = true;
directionalLight.position.set(0, 0, 20);
scene.add(directionalLight);

// PointLight
const pointLight = new THREE.PointLight(0x666666, 50); // Note the corrected THREE.PointLight
pointLight.castShadow = true;
pointLight.position.set(0, 1.3, 3);
scene.add(pointLight);

// const sphereSize = 0.5;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper);

// const helper = new THREE.DirectionalLightHelper(directionalLight, 2);
// scene.add(helper);

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

/***
 * Models
 */

// PICTURE ON THE WALL
const textureLoader = new THREE.TextureLoader();

// PICTURE 1
const picture1 = textureLoader.load("../assets/textures/dessinenfant.png");

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 1, 0),
  new THREE.MeshStandardMaterial({
    map: picture1,
  })
);

cube1.position.y = 1.7;
cube1.position.x = -1.3;
cube1.position.z = 0.2;
cube1.rotation.z = Math.PI / -25;
cube1.scale.set(0.2, 0.2, 0.2);

// PICTURE 2
const picture2 = textureLoader.load(
  "../assets/textures/photosouvenir_minnijeu2.png"
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.7, 1.1, 0),
  new THREE.MeshStandardMaterial({
    map: picture2,
  })
);

cube2.position.y = 1.7;
cube2.position.x = -1.8;
cube2.position.z = 0.2;
cube2.rotation.z = Math.PI * 0.01;
cube2.scale.set(0.2, 0.2, 0.2);

// PICTURE 3
const picture3 = textureLoader.load(
  "../assets/textures/photosouvenir_minnijeu3.png"
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.1, 0),
  new THREE.MeshStandardMaterial({
    map: picture3,
  })
);

cube3.position.y = 1.2;
cube3.position.x = -1.8;
cube3.position.z = 0.2;
cube3.rotation.z = Math.PI * 0.015736832;
cube3.scale.set(0.2, 0.2, 0.2);

// PICTURE 4
const picture4 = textureLoader.load(
  "../assets/textures/photosouvenir_minnijeu4.png"
);

const cube4 = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.3, 0),
  new THREE.MeshStandardMaterial({
    map: picture4,
  })
);

cube4.position.y = 1.48;
cube4.position.x = -1.51;
cube4.position.z = 0.2;
cube4.rotation.z = Math.PI * 0.03;
cube4.scale.set(0.2, 0.2, 0.2);

// PICTURE 5
const picture5 = textureLoader.load("../assets/textures/photo_bebe.png");

const cube5 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.3, 0),
  new THREE.MeshStandardMaterial({
    map: picture5,
  })
);

cube5.position.y = 1.45;
cube5.position.x = -1.2;
cube5.position.z = 0.2;
cube5.rotation.z = Math.PI * -0.01;
cube5.scale.set(0.1, 0.1, 0.1);

// PICTURE 6
const picture6 = textureLoader.load(
  "../assets/textures/photo_anniversaire.png"
);

const cube6 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.3, 0),
  new THREE.MeshStandardMaterial({
    map: picture6,
  })
);

cube6.position.y = 1.2;
cube6.position.x = -1.3;
cube6.position.z = 0.2;
cube6.rotation.z = Math.PI * -0.01;
cube6.scale.set(0.15, 0.15, 0.15);

// PICTURE 7
const picture7 = textureLoader.load("../assets/textures/photo_famille.png");

const cube7 = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.3, 0),
  new THREE.MeshStandardMaterial({
    map: picture7,
  })
);

cube7.position.y = 1.8;
cube7.position.x = -1.55;
cube7.position.z = 0.2;
cube7.rotation.z = Math.PI * -0.01;
cube7.scale.set(0.2, 0.2, 0.2);

// PICTURE 8
const picture8 = textureLoader.load("../assets/textures/photo_puzzle.png");

const cube8 = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 0.9, 0),
  new THREE.MeshStandardMaterial({
    map: picture8,
  })
);

cube8.position.y = 1.45;
cube8.position.x = -1.8;
cube8.position.z = 0.2;
cube8.rotation.z = Math.PI * -0.01;
cube8.scale.set(0.16, 0.15, 0.15);

scene.add(cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8);

// ThreeJs Models

// Baby Button
const justBornButton = document.querySelector(".justBornButton");
const smoothingFactorJustBorn = -4;
const babyButton = document.querySelector(".babyButton");
const smoothingFactorBaby = 1.5;
const childButton = document.querySelector(".childButton");
const smoothingFactorChild = 3;
const adoButton = document.querySelector(".adoButton");
const smoothingFactorAdo = -10;

const endButton = document.querySelector(".endButton");

const ALL_BUTTONS = [justBornButton, babyButton, childButton, adoButton];

// Imported models
// ROOM
const gltfLoader = new GLTFLoader();
gltfLoader.load("./3D/mesh/room/room.gltf", (gltf) => {
  const room = gltf.scene.children[0];
  room.receiveShadow = true;

  scene.add(gltf.scene.children[0]);
});

// DOOR
gltfLoader.load("./3D/mesh/room/door.gltf", (gltf) => {
  const door = gltf.scene.children[0];

  door.castShadow = true;

  scene.add(gltf.scene.children[0]);
});

// LAPTOP
gltfLoader.load("./3D/mesh/room/laptop.gltf", (gltf) => {
  const laptop = gltf.scene.children[0];
  laptop.receiveShadow = true;
  laptop.castShadow = true;

  scene.add(gltf.scene.children[0]);
});

// LEGO
gltfLoader.load("./3D/mesh/room/lego.gltf", (gltf) => {
  const lego = gltf.scene.children[0];
  lego.receiveShadow = true;
  lego.castShadow = true;

  scene.add(gltf.scene.children[0]);
});

// PUZZLE
gltfLoader.load("./3D/mesh/room/puzzle.gltf", (gltf) => {
  const puzzle = gltf.scene.children[0];
  puzzle.receiveShadow = true;
  puzzle.castShadow = true;

  scene.add(gltf.scene.children[0]);
});

// PHOTO
// gltfLoader.load("./3D/mesh/room/photos.gltf", (gltf) => {
//   const photos = gltf.scene.children[0];
//   photos.receiveShadow = true;
//   photos.castShadow = true;

//   scene.add(gltf.scene.children[0]);
// });

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

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

// Animate
const clock = new THREE.Clock();

//////////////////////////////////////////////////

const lookAtTargetBorn = new THREE.Vector3(0, -1.3, 0);
const lookAtTargetBaby = new THREE.Vector3(0, -1.3, 0);
const lookAtTargetChild = new THREE.Vector3(0, -1.3, 0);
const lookAtTargetAdo = new THREE.Vector3(0, -1.3, 0);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Born ANIMATION
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LEGO
justBornButton.addEventListener("click", () => {
  isCameraAnimating = true;
  document.removeEventListener("mousemove", handleMouseMove);

  toggleAllButtons(false);
  /**
   * ATTENTION
   */
  // toggleAllButtons(false);
  // justBornButton.style.display = "none";
  // babyButton.style.display = "none";
  // childButton.style.display = "none";
  // adoButton.style.display = "none";

  gsap.to(camera.position, {
    duration: 2,
    x: -1.7,
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
});

/**
 * baby ANIMATION
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SLIDER
babyButton.addEventListener("click", () => {
  isCameraAnimating = true;
  document.removeEventListener("mousemove", handleMouseMove);

  toggleAllButtons(false);

  /**
   * ATTENTION
   */

  gsap.to(camera.position, {
    duration: 2,
    x: -1.1,
    y: 1.5,
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
});

/**
 * child ANIMATION
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUZZLE
childButton.addEventListener("click", () => {
  isCameraAnimating = true;
  document.removeEventListener("mousemove", handleMouseMove);

  toggleAllButtons(false);
  /**
   * ATTENTION
   */
  // toggleAllButtons(false);
  // justBornButton.style.display = "none";
  // babyButton.style.display = "none";
  // childButton.style.display = "none";
  // adoButton.style.display = "none";

  gsap.to(camera.position, {
    duration: 2,
    x: 1.2,
    y: 0.6,
    z: 1.3,
    ease: "power2.inOut",
    onComplete: () => {
      /**
       * ATTENTION METTRE ISCAMERAANIMATING = FALSE EN SORTANT DU MINI JEU EST FINI
       */
      // isCameraAnimating = false;

      document.addEventListener("mousemove", handleMouseMove);
    },
  });
});

/**
 * ado ANIMATION
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ORDINATEUR
adoButton.addEventListener("click", () => {
  isCameraAnimating = true;
  document.removeEventListener("mousemove", handleMouseMove);

  toggleAllButtons(false);
  /**
   * ATTENTION
   */

  // toggleAllButtons(false);
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
      // setTimeout(() => {
      //   isCameraAnimating = false;
      //   toggleAllButtons(true);
      // }, 3000);
      //
      // document.querySelector(".gameslist").classList.add("shown");
      // document.querySelector(".gamesdescription").classList.add("shown");

      document.addEventListener("mousemove", handleMouseMove);
    },
  });
});

// END BUTTON
endButton.addEventListener("click", () => {
  isCameraAnimating = true;
  document.removeEventListener("mousemove", handleMouseMove);

  toggleAllButtons(false);

  gsap.to(camera.position, {
    duration: 5,
    x: 0,
    y: 2,
    z: 1,
    ease: "power2.inOut",
    onComplete: () => {
      // Add a fade-in animation for the overlay
      gsap.to(overlay, {
        duration: 1, // Adjust the duration as needed
        opacity: 1,
        onComplete: () => {
          document.addEventListener("mousemove", handleMouseMove);
        },
      });
    },
  });
});

///////////////////////////////// VICTORY

let STORY = {
  sms: false,
  puzzle: false,
  photos: false,
  legos: false,

  checkIfGameOver: function () {
    console.log(this["legos"] && this["puzzle"]);
    if (this["legos"] && this["puzzle"] && this["photos"] && this["sms"]) {
      toggleAllButtons(false);

      document.querySelector(".endButton").classList.add("visible");

      const videoContainer = document.querySelector(".video-container");
      videoContainer.style.display = "block";
      const video = videoContainer.querySelector("video");
      video.requestFullscreen().then(() => video.play());
    }
  },
};
document.querySelector(".endButton").addEventListener("click", () => {
  STORY.checkIfGameOver();
});

///////////////////////////////////////////////// SHOW & HIDE GAME

let openGameButtons = document.querySelectorAll(".js-openGameWindow");

let gsapButtons = document.querySelectorAll(".minigame-button");

let gamedescription = document.querySelector(`.gamesdescription`);

let allGamesDescriptions = gamedescription.querySelectorAll(
  ".gamedescription__card"
);
let allGamesWindows = document.querySelectorAll(".gamemain");

for (let gsapBut of gsapButtons) {
  let gameName = gsapBut.dataset.name;
  let openButton = gamedescription.querySelector(
    `.${gameName} .js-openGameWindow`
  );
  let closeButton = document.querySelector(
    `.gameslist .${gameName} .js-closeGameWindow`
  );

  gsapBut.addEventListener("click", function () {
    setTimeout(() => {
      gamedescription.classList.add("shown");
      openButton.closest(".gamedescription__card").classList.add("visible");
    }, 1500);
  });

  openButton.addEventListener("click", function () {
    gamedescription.classList.remove("shown");
    for (let gameDesc of allGamesDescriptions) {
      gameDesc.classList.remove("visible");
    }
    setTimeout(() => {
      document.querySelector(".gameslist").classList.add("shown");
      closeButton.closest(".gamemain").classList.add("visible");
    }, 400);
  });

  closeButton.addEventListener("click", function () {
    this.closest(".gameslist").classList.remove("shown");
    for (let gameWindow of allGamesWindows) {
      gameWindow.classList.remove("visible");
    }
    isCameraAnimating = false;
    // toggleAllButtons(true);

    if (!isCameraAnimating) {
      gsap.to(camera.position, {
        duration: 2,
        x: 0,
        y: -1,
        z: 5,
        ease: "power2.inOut",
      });
      toggleAllButtons(true);
    }

    STORY[gameName] = true;
    STORY.checkIfGameOver();
  });
}

//////////////////////////////////////////////////////////////////////////////////// TICK

// Variables
let elapsedTimeSinceLoad = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - elapsedTimeSinceLoad;

  // Update controls
  // controls.update();

  // Update camera rotation based on mouse position
  if (!isCameraAnimating) {
    const speedMultiplier = Math.min(1, elapsedTimeSinceLoad / 20); // Speed increases gradually for the first 10 seconds
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      (mouse.x * Math.PI) / 10,
      0.1 * speedMultiplier
    );

    camera.position.y = THREE.MathUtils.lerp(
      (camera.position.y = 1.6),
      mouse.y * Math.PI * 1,
      0.1 * speedMultiplier
    );
  }

  // Render
  renderer.render(scene, camera);

  // Move justBornButton based on mouse positiozn
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

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const handleMouseMove = (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = (event.clientY / sizes.height) * 2 + 1;
};

document.addEventListener("mousemove", handleMouseMove);

///////////////////////////////// MAIN

tick();

// Update elapsed time since the page is loaded
const updateElapsedTime = () => {
  elapsedTimeSinceLoad = clock.getElapsedTime();
  if (elapsedTimeSinceLoad < 10) {
    // If less than 10 seconds, schedule the next update
    requestAnimationFrame(updateElapsedTime);
  }
};

// Schedule the first update
requestAnimationFrame(updateElapsedTime);

/////////////// puzzle

document.querySelector(".js-openPuzzle").addEventListener("click", function () {
  try {
    let puzzleList = document.querySelector("#divmenu");
    let puzzle = puzzleList.querySelector(".line:nth-of-type(3)");
    puzzle.click();
    puzzleList.classList.add("display-none");
  } catch (e) {}

  setTimeout(() => {
    document
      .querySelector(".gamemain.puzzle .js-closeGameWindow")
      .classList.add("visible");
  }, 2000);
});

/////////////// legos

// document.querySelector(".js-openLegos").addEventListener(
//   "click",
//   function() {
//     setTimeout(() => {
//       document.querySelector('.gamemain.legos .js-closeGameWindow').classList.add('visible');
//     }, 2000);
//   }
// );
