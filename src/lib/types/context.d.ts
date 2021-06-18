import * as THREE from 'three';

export type RootContext = {
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

export type Context<T> = {
	invalidate: () => void;
	parent: import('svelte/store').Readable<THREE.Object3D>;
	self: import('svelte/store').Writable<T>;
};

export type GroupContext = {
	add: (object: THREE.Object3D) => void;
	remove: (object: THREE.Object3D) => void;
};

export type ObjectContext = {
	current: import('svelte/store').Writable<THREE.Object3D>;
};
