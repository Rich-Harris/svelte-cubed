import * as THREE from 'three';

type RootContext = {
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;

	camera: {
		object: THREE.Camera;
		callback: (w: number, h: number) => void;
		set: (camera: THREE.Camera, callback: (w: number, h: number) => void) => void;
	};

	controls: {
		object: THREE.EventDispatcher;
		callback: (camera: THREE.Camera, canvas: HTMLCanvasElement) => THREE.EventDispatcher;
		set: (
			callback: (camera: THREE.Camera, canvas: HTMLCanvasElement) => THREE.EventDispatcher
		) => void;
	};

	invalidate: () => void;
};

type GroupContext = {
	add: (object: THREE.Object3D) => void;
	remove: (object: THREE.Object3D) => void;
};
