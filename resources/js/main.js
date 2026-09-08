import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const LINES = [...document.querySelectorAll("#headline span")].map((span) =>
  span.textContent.trim().toUpperCase()
);
const BG = "#e9e9e7";
const INK = "#111111";
const CAMERA_Z = 5;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = CAMERA_Z;

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const textCanvas = document.createElement("canvas");
const textCtx = textCanvas.getContext("2d");
let textTexture = null;

let textProgress = 0;

// 1. .meta 관련 변수 추가
const metaElement = document.querySelector(".meta");
let metaTriggered = false;

const textPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ toneMapped: false })
);
scene.add(textPlane);

const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 300, 48, 2, 3),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    opacity: 1,
    transparent: true,
    roughness: 0.1,          // 거칠기 (낮을수록 매끈한 오로라 광택)
    ior: 1.5,                // 굴절률
    thickness: 0.7,
    ior: 1.45,
    dispersion: 8,
    iridescence: 1.0,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [100, 800],
    envMapIntensity: 2.0, // 주변 환경 빛 반사 강도
    clearcoatRoughness: 0.1, 
    toneMapped: false
  })
);

torus.position.z = 2.2;
scene.add(torus);

function drawText(width, height) {
  const dpr = Math.min(window.devicePixelRatio, 2);
  textCanvas.width = Math.round(width * dpr);
  textCanvas.height = Math.round(height * dpr);
  textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  textCtx.fillStyle = BG;
  textCtx.fillRect(0, 0, width, height);
  textCtx.fillStyle = INK;
  textCtx.textAlign = "left";
  textCtx.textBaseline = "middle";

  const maxHeight = height * 0.78;
  const lineGap = 0.98;

  const fontMultipliers = [1.0, 0.3, 0.1];

  const sizes = LINES.map((line, i) => {
    return (width * 0.12) * fontMultipliers[i];
  });
  const totalHeight = sizes.reduce((sum, size) => sum + size * lineGap, 0);
  const fit = Math.min(1, maxHeight / totalHeight);

  const paddingLeft = width * 0.05;
  const startOffset = width * 0.12;

  let y = height / 2 - (totalHeight * fit) / 2;

  LINES.forEach((line, i) => {
    const size = sizes[i] * fit;
    textCtx.font = `800 ${size}px "Inter Tight", sans-serif`;
    y += (size * lineGap) / 2;

    const lineDelay = i * 0.15;
    const currentLineProgress = Math.min(
      Math.max((textProgress - lineDelay) / (1 - lineDelay), 0),
      1
    );

    const easeProgress = 1 - Math.pow(1 - currentLineProgress, 3);
    const currentX = paddingLeft - startOffset * (1 - easeProgress);

    textCtx.fillText(line, currentX, y);
    y += (size * lineGap) / 2;
  });

  if (textTexture) {
    textTexture.dispose();
  }
  textTexture = new THREE.CanvasTexture(textCanvas);
  textTexture.colorSpace = THREE.SRGBColorSpace;
  textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  textPlane.material.map = textTexture;
  textPlane.material.needsUpdate = true;
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const visibleHeight =
    2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const visibleWidth = visibleHeight * camera.aspect;
  textPlane.scale.set(visibleWidth, visibleHeight, 1);

  const torusScale = Math.min(visibleWidth, visibleHeight) * 0.09;
  torus.scale.setScalar(torusScale);

  drawText(width, height);
}

const pointer = new THREE.Vector2();
window.addEventListener("pointermove", (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
});

const clock = new THREE.Clock();

// 2. render() 함수 수정
function render() {
  const t = clock.getElapsedTime();

  if (textProgress < 1) {
    textProgress += 0.012;
    if (textProgress > 1) textProgress = 1;
    drawText(window.innerWidth, window.innerHeight);

    if (!metaTriggered && textProgress > 0.6) {
      metaTriggered = true;
      metaElement?.classList.add("is-visible");
    }
  }

  if (!reducedMotion) {
    torus.rotation.x = t * 0.35 + pointer.y * 0.15;
    torus.rotation.y = t * 0.5 + pointer.x * 0.2;
  } else {
    torus.rotation.set(0.6, 0.4, 0);
  }

  renderer.render(scene, camera);
}

function debounce(fn, delay) {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
}

const debouncedResize = debounce(resize, 150);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  debouncedResize();
});

// 3. fonts.ready 초기화 수정
document.fonts.ready.then(() => {
  resize();
  if (reducedMotion) {
    textProgress = 1;
    metaElement?.classList.add("is-visible");
    drawText(window.innerWidth, window.innerHeight);
    render();
  } else {
    renderer.setAnimationLoop(render);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const follower = document.querySelector(".cursor-follower");
  const hoverTargets = document.querySelectorAll("button, a, .port-li");

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      follower?.classList.add("hover-concept-1");
    });

    target.addEventListener("mouseleave", () => {
      follower?.classList.remove("hover-concept-1");
    });
  });
});


