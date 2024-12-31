import "./style.css";
import {
	AmbientLight,
	Camera,
	DirectionalLight,
	DoubleSide,
	MeshStandardMaterial,
	Object3D,
	Scene,
	Vector3,
	WebGLRenderer,
} from "three";

const { width, height } = { width: 1472, height: 864 };

const { canvas } = (() => {
	const app = document.getElementById("app");
	return { app, canvas: app.querySelector("canvas") };
})();

const renderer = new WebGLRenderer();
renderer.setSize(width, height);

const scene = new Scene();

const camera = new Camera();
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

function tick() {
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
}

tick();
