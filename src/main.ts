import "./style.css";
import {
	AmbientLight,
	BoxGeometry,
	ConeGeometry,
	CylinderGeometry,
	DirectionalLight,
	DoubleSide,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	TetrahedronGeometry,
	TorusGeometry,
	Vector3,
	WebGLRenderer,
} from "three";

const { width, height } = { width: 1472, height: 864 };

const { canvas } = (() => {
	const app = document.getElementById("app");
	return { app, canvas: app.querySelector("canvas") };
})();

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(width, height);

const scene = new Scene();

const camera = new PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(0, 500, 1000);
camera.lookAt(new Vector3(0, 0, 0));

const container = new Object3D();
scene.add(container);

const material = new MeshStandardMaterial({
	color: 0xff0000,
	side: DoubleSide,
});

const directionalLight = new DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
const ambientLight = new AmbientLight(0x999999);
scene.add(ambientLight);

const geometries = [
	new SphereGeometry(50),
	new BoxGeometry(100, 100, 100),
	new PlaneGeometry(100, 100),
	new TetrahedronGeometry(100, 0),
	new ConeGeometry(100, 100, 32),
	new CylinderGeometry(50, 50, 100, 32),
	new TorusGeometry(50, 30, 16, 100),
];
geometries.map((geometry, index) => {
	const mesh = new Mesh(geometry, material);
	container.add(mesh);
	mesh.position.x = 400 * Math.sin((index / geometries.length) * Math.PI * 2);
	mesh.position.z = 400 * Math.cos((index / geometries.length) * Math.PI * 2);
});

function tick() {
	container.rotation.y += 0.01;
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
}

tick();
