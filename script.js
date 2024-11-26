// Three.js 기본 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls 추가
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// 나선 데이터를 생성
const points = [];
const numPoints = 1000; // 세밀도 조절
const turns = 4; // 나선의 횟수
const radius = 1;

for (let i = 0; i <= numPoints; i++) {
    const theta = (i / numPoints) * turns * Math.PI * 2;
    const x = radius * Math.cos(theta); // 실수부
    const y = radius * Math.sin(theta); // 허수부
    const z = (i / numPoints) * turns * 2 * Math.PI; // 높이
    points.push(new THREE.Vector3(x, y, z));
}

// 나선형 궤적 생성
const curve = new THREE.CatmullRomCurve3(points);
const geometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const tube = new THREE.Mesh(geometry, material);
scene.add(tube);

// 카메라 위치 설정
camera.position.set(5, 5, 10);
controls.update();

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // OrbitControls 업데이트
    renderer.render(scene, camera);
}
animate();
