
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

const container = document.getElementById('hero-planet');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Canvas for gradient texture
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');

const texture = new THREE.CanvasTexture(canvas);

const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xaaaaaa,
    roughness: 0.8,
    metalness: 0,
    emissive: 0x000000
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.15);
scene.add(hemiLight);

camera.position.z = 15;

// Animate the gradient color slowly
let time = 0;
function updateGradient() {
    time += 0.002; // slower speed
    const cyan = { r: 0, g: 255, b: 255 };
    const red = { r: 230, g: 57, b: 70 }; // #E63946

    // Sin wave interpolation between cyan and red
    const t = (Math.sin(time) + 1) / 2; // 0 -> 1 smoothly
    const r = Math.round(cyan.r * (1 - t) + red.r * t);
    const g = Math.round(cyan.g * (1 - t) + red.g * t);
    const b = Math.round(cyan.b * (1 - t) + red.b * t);

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, `rgb(${r},${g},${b})`);
    gradient.addColorStop(1, '#111111'); // dark edge
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    texture.needsUpdate = true;
}

// Animate the sphere
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.0005;
    updateGradient();
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Fade-in
container.style.opacity = 0;
container.style.transition = "opacity 2s ease-out";
window.addEventListener('DOMContentLoaded', () => {
    container.style.opacity = 1;
});