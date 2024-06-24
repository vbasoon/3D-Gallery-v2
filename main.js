import './style.css'
import * as THREE from 'three'
//import { orbitControls} from "three/examples/jsm/controls/OrbitControls"

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
let light = new THREE.AmbientLight(0x101010, 1.0);
console.log(camera.position);
console.log(light.position);
//light.position = camera.position;
scene.add(light);

let sunLight = new THREE.DirectionalLight(0xdddddd, 100);
sunLight.position.y = 15;
scene.add(sunLight)

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'green' });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube)

// Functions
// Function KeyDown
const onKeyDown = (event) => {
  const keyCode = event.keyCode;

  switch (keyCode) {
    case 37: // left arrow key
      camera.translateX(0.05);
      break;
    case 38: // up arrow key
      camera.translateY(-0.05);
      break;
    case 39: // right arrow key
      camera.translateX(-0.05);
      break;
    case 40: // down arrow key
      camera.translateY(0.05);
      break;
    
  }
}

// Function animate

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Controls

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
