import * as THREE from "three";
import { DoubleSide } from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * @type THREE.Mesh
 */
let particle;
const particlePosition = { x: 0, y: 0, z: 0 };
const particleRotation = { x: 0, y: 0, z: 0 };

const clock = new THREE.Clock();

/**
 * @type THREE.WebGLRenderer
 */
let renderer;

/**
 * @type THREE.Scene
 */
let scene;

/**
 * @type THREE.Camera
 */
let camera;

init();
animate();

function init() {
  const container = document.getElementById("container");

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 100);
  scene.add(camera);

  scene.add(new THREE.AmbientLight(0x404040));

  const pointLight = new THREE.PointLight(0xffffff, 3.0);
  camera.add(pointLight);

  const triangleShape = new THREE.Shape()
    .moveTo(0, 2.5)
    .lineTo(-2.5, -2.5)
    .lineTo(2.5, -2.5)
    .lineTo(0, 2.5); // close path

  const geometry = new THREE.ShapeGeometry(triangleShape);
  particle = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({
      emissive: 1.0,
      side: DoubleSide,
      flatShading: true,
    })
  );
  particle.position.set(
    particlePosition.x,
    particlePosition.y,
    particlePosition.z
  );
  scene.add(particle);
}

function animate() {
  const delta = clock.getDelta();

  render(delta);
  requestAnimationFrame(animate);
}

function render(delta) {
  particlePosition.y -= delta * 10;
  particleRotation.z += delta;
  particleRotation.y += delta * 0.6;
  particleRotation.x += delta * 0.4;
  particle.position.set(
    particlePosition.x,
    particlePosition.y,
    particlePosition.z
  );

  particle.rotation.set(
    particleRotation.x,
    particleRotation.y,
    particleRotation.z
  );

  if (particlePosition.y < -100) particlePosition.y = 100;

  renderer.render(scene, camera);
}
