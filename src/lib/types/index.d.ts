export type EulerOrder = 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';

export type Position = [number, number, number];
export type Rotation = [number, number, number, EulerOrder?];
export type Scale = number | [number, number, number];

export type Skin = {
	index: import('three').BufferAttribute;
	weight: import('three').BufferAttribute;
};
