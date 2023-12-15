import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Set global variables
var camera, scene, renderer, mesh, controls;

// Call init funtion and render loop
init();
render();

function init() {
  // Setting camera and this position
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;

  // Create and Config Scene
  scene = new THREE.Scene();
  console.log(scene);

  // Create and Config the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set scene canvas in body
  document.body.appendChild(renderer.domElement);

  // Create geometry cube
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshBasicMaterial();

  // Set new mesh
  mesh = new THREE.Mesh(geometry, material);

  // Add Mesh on scene
  scene.add(mesh);

  // OrbitControls Configurations
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 250;
  controls.maxDistance = 600;
}

function render() {
  // On frame update call render funtion
  requestAnimationFrame(render);

  // Set cube/mesh rotation
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z -= 0.01;

  // Set cube color
  mesh.material.color = new THREE.Color(0xff0900);

  // If controls exist, update this controls
  if (controls) {
    controls.update();
  }

  // Set cube positions

  // if (mesh.position.x >= 601) {
  //   mesh.position.x = -601;
  // }
  // if (mesh.position.x >= -601) {
  //   mesh.position.x += 10;
  // }

  // Render scene in camera frames in canvas
  renderer.render(scene, camera);
}

// Resize window update
window.onresize = () => {
  // Modify camera aspect in window
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Re-set canvas size on window re-size
  renderer.setSize(window.innerWidth, window.innerHeight);
};
