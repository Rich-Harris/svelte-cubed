export const SIZE = 5;

/** @typedef {{
 *   coords: import('svelte-cubed').Position;
 *   velocity: import('svelte-cubed').Position;
 *   mass: number;
 *   radius: number;
 *   brightness: number;
 * }} Star */

/** @param {Star[]} stars */
export function center_of_mass(stars) {
	const c = [0, 0, 0];
	let m = 0;

	for (const star of stars) {
		c[0] += star.coords[0] * star.mass;
		c[1] += star.coords[1] * star.mass;
		c[2] += star.coords[2] * star.mass;
		m += star.mass;
	}

	return [c[0] / m, c[1] / m, c[2] / m];
}

const rand = () => SIZE * 1 * (Math.random() - 0.5);

export function create_star() {
	const mass = 0.1 + Math.random() * 3;

	/** @type {Star} */
	const star = {
		coords: [rand(), rand(), rand()],
		velocity: [0, 0, 0],
		mass,
		radius: 0.1 * Math.pow(mass, 1 / 3),
		brightness: 2 * Math.pow(mass, 1 / 3)
	};

	return star;
}

/**
 * @param {Star[]} stars
 * @param {number} gravity
 */
export function update(stars, gravity) {
	for (let i = 0; i < stars.length; i += 1) {
		for (let j = i + 1; j < stars.length; j += 1) {
			const a = stars[i];
			const b = stars[j];

			const dx = b.coords[0] - a.coords[0];
			const dy = b.coords[1] - a.coords[1];
			const dz = b.coords[2] - a.coords[2];

			// find the gravitational force
			const force = ((gravity / 1e5) * a.mass * b.mass) / (dx * dx + dy * dy + dz * dz);

			// accelerate bodies
			a.velocity[0] += (force * (b.coords[0] - a.coords[0])) / a.mass;
			a.velocity[1] += (force * (b.coords[1] - a.coords[1])) / a.mass;
			a.velocity[2] += (force * (b.coords[2] - a.coords[2])) / a.mass;

			b.velocity[0] -= (force * (b.coords[0] - a.coords[0])) / b.mass;
			b.velocity[1] -= (force * (b.coords[1] - a.coords[1])) / b.mass;
			b.velocity[2] -= (force * (b.coords[2] - a.coords[2])) / b.mass;

			if (a.coords[0] - a.radius < -SIZE) a.velocity[0] = Math.abs(a.velocity[0]);
			if (a.coords[1] - a.radius < -SIZE) a.velocity[1] = Math.abs(a.velocity[1]);
			if (a.coords[2] - a.radius < -SIZE) a.velocity[2] = Math.abs(a.velocity[2]);

			if (a.coords[0] + a.radius > +SIZE) a.velocity[0] = -Math.abs(a.velocity[0]);
			if (a.coords[1] + a.radius > +SIZE) a.velocity[1] = -Math.abs(a.velocity[1]);
			if (a.coords[2] + a.radius > +SIZE) a.velocity[2] = -Math.abs(a.velocity[2]);

			if (b.coords[0] - b.radius < -SIZE) b.velocity[0] = Math.abs(b.velocity[0]);
			if (b.coords[1] - b.radius < -SIZE) b.velocity[1] = Math.abs(b.velocity[1]);
			if (b.coords[2] - b.radius < -SIZE) b.velocity[2] = Math.abs(b.velocity[2]);

			if (b.coords[0] + b.radius > +SIZE) b.velocity[0] = -Math.abs(b.velocity[0]);
			if (b.coords[1] + b.radius > +SIZE) b.velocity[1] = -Math.abs(b.velocity[1]);
			if (b.coords[2] + b.radius > +SIZE) b.velocity[2] = -Math.abs(b.velocity[2]);

			// apply acceleration
			a.coords[0] += a.velocity[0];
			a.coords[1] += a.velocity[1];
			a.coords[2] += a.velocity[2];

			b.coords[0] += b.velocity[0];
			b.coords[1] += b.velocity[1];
			b.coords[2] += b.velocity[2];
		}
	}

	return stars;
}
