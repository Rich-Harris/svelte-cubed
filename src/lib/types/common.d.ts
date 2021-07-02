export type EulerOrder = 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
export type Position = [number, number, number];
export type Rotation = [number, number, number, EulerOrder?];
export type Scale = number | [number, number, number];

// TODO remove this, it doesn't really belong in the library
export type Skin = {
	index: import('three').BufferAttribute;
	weight: import('three').BufferAttribute;
};
