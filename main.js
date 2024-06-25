import './style.css'
import * as THREE from 'three'
import { PointerLockControls } from 'three-stdlib';
//import { orbitControls} from "three/examples/jsm/controls/OrbitControls"

// Variables
// const menu = document.getElementById("menu");
// console.log(menu);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement)


// Scene
const scene = new THREE.Scene();

// Camera
let fov = 75;
let ratio = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;
const camera = new THREE.PerspectiveCamera(fov, ratio, near, far);

scene.add(camera);
camera.position.z = 5;

// Light
const light = new THREE.AmbientLight(0x101010, 1.0);

//light.position = camera.position;
scene.add(light);

const sunLight = new THREE.DirectionalLight(0xdddddd, 100);
sunLight.position.y = 15;
scene.add(sunLight)

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const cube = new THREE.Mesh(geometry, material);
//cube.position.y = -7;

scene.add(cube)

// Textures of floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('images/Floor.jpg'); 
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horisontal direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT is vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// let floorTexture = new THREE.TextureLoader().load('images/Floor.jpg');

// Texures of ceiling
const ceilingTexture = new THREE.TextureLoader().load('images/ceiling.jpg');

// Plane floor
const planeGeometry = new THREE.PlaneGeometry(45, 45);
const planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2;
floorPlane.position.y = -1;
scene.add(floorPlane)

//Create the walls
const wallsGroup = new THREE.Group();
scene.add(wallsGroup);

// Front Wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({
        color: 'green'
    })
);
frontWall.position.z = -20;


// Left Wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({
        color: 'red'
    })
);

leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -20;
// wallsGroup.add(leftWall)

// Right Wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({
        color: 'yellow'
    })
);

rightWall.rotation.y = Math.PI / 2;
rightWall.position.x = 20;

// Back Wall


wallsGroup.add(frontWall, leftWall, rightWall);

// Loop through each wall and create the bonding box
for (let i = 0; i < wallsGroup.children.length; i++) {
  wallsGroup.children[i].BBox = new THREE.Box3();
  wallsGroup.children[i].BBox.setFromObject(wallsGroup.children[i]);
}

// Ceiling
const ceilingGeometry = new THREE.PlaneGeometry(45, 45);
const ceilingMaterial = new THREE.MeshBasicMaterial({
    map: ceilingTexture,
    side: THREE.DoubleSide,
    
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingPlane.rotation.x = Math.PI / 2;
ceilingPlane.position.y = 10;
scene.add(ceilingPlane);


// Functions
// Function KeyDown
const onKeyDown = (event) => {
  const keyCode = event.keyCode;

  switch (keyCode) {
    case 37:
    case 65: // left arrow key
      controls.moveRight(-0.08);
      break;
    case 38:
    case 87: // up arrow key
      controls.moveForward(0.08);
      break;
    case 39:
    case 68: // right arrow key
      controls.moveRight(0.08);
      break;
    case 40:
    case 83: // down arrow key
      controls.moveForward(-0.08);
      break;
    
  }
}

// Function animate

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Function Create Painting
function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader();
  const paintTexture = textureLoader.load(imageURL);
  const paintMaterial = new THREE.MeshBasicMaterial({
    map: paintTexture,
  });
  const paintGeometry = new THREE.PlaneGeometry(width, height);
  const painting = new THREE.Mesh(paintGeometry, paintMaterial);
  painting.position.set(position.x, position.y, position.z);
  console.log(position.x);
  console.log(position.y);
  console.log(position.z);

  return painting
} 

const painting1 = createPainting("/artworks/0.jpg", 10, 5, new THREE.Vector3(-10, 5, -19.99));
const painting2 = createPainting("/artworks/1.jpg", 10, 5, new THREE.Vector3(10, 5, -19.99));

scene.add(painting1, painting2);

// Controls

const controls = new PointerLockControls(camera, document.body);

// Lock the pointer(controls are activated) and hide the menu when the experience starts
function startExperience() {
  // Lock the pointer
  controls.lock();
  // Hide the menu
  hideMenu();
}

const playButton = document.getElementById("play_button")
playButton.addEventListener('click', startExperience);

// Hide Menu
function hideMenu() {
  const menu = document.getElementById("menu");
  
  menu.style.display = 'none';
}

// Show menu
function showMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu)

document.addEventListener('keydown', onKeyDown, false);
// document.addEventListener(
//     'keydown',
//     (e) => {
//         let keycode = e.which;

//         // left arrow key
//         if (keycode === 39) {
//             camera.translateX(-0.05);
//         } 
//         // right arrow key
//         else if (keycode === 37) {
//             camera.translateX(0.05);
//         }
        
//         // up arrow key
//         else if (keycode === 38) {
//             camera.translateY(-0.05);
//         }
        
//         // down arrow key
//         else if (keycode === 40) {
//             camera.translateY(0.05);
//         }
//     },
//     false
// )



// const sphereGeometry = new THREE.SphereGeometry()
// const sphereMaterial = new THREE.MeshBasicMaterial()

// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// scene.add(sphere);




renderer.setAnimationLoop(animate);
