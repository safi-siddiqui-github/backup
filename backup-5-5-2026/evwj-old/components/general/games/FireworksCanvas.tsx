// FireworksCanvas.tsx

"use client";

import React, { useCallback, useEffect, useRef } from "react";

const PARTICLES_PER_FIREWORK = 100;
const FIREWORK_CHANCE = 0.015;
const BASE_PARTICLE_SPEED = 0.6;
const FIREWORK_LIFESPAN = 600;
const PARTICLE_INITIAL_SPEED = 4.5;
const GRAVITY = 9.8;

class Particle {
	x: number;
	y: number;
	red: number;
	green: number;
	blue: number;
	alpha: number;
	radius: number;
	angle: number; // radians
	speed: number;
	velocityX: number;
	velocityY: number;
	startTime: number;
	duration: number;
	currentDuration: number;
	dampening: number;
	colour: string;
	initialVelocityX: number;
	initialVelocityY: number;
	lineWidth: number = 2;

	constructor(
		x: number = 0,
		y: number = 0,
		red: number = ~~(Math.random() * 255),
		green: number = ~~(Math.random() * 255),
		blue: number = ~~(Math.random() * 255),
		speed: number,
		isFixedSpeed?: boolean,
	) {
		this.x = x;
		this.y = y;
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = 0.05;
		this.radius = 1 + Math.random();
		this.angle = Math.random() * Math.PI * 2; // radians
		this.speed = Math.random() * speed + 0.1;
		this.velocityX = Math.cos(this.angle) * this.speed;
		this.velocityY = Math.sin(this.angle) * this.speed;
		this.startTime = Date.now();
		this.duration = Math.random() * 300 + FIREWORK_LIFESPAN;
		this.currentDuration = 0;
		this.dampening = 30;
		if (isFixedSpeed) {
			this.speed = speed;
			this.velocityY = Math.sin(this.angle) * this.speed;
			this.velocityX = Math.cos(this.angle) * this.speed;
		}
		this.initialVelocityX = this.velocityX;
		this.initialVelocityY = this.velocityY;
		this.colour = this.getColour();
	}

	getColour(
		red?: number,
		green?: number,
		blue?: number,
		alpha?: number,
	): string {
		return `rgba(${red || this.red}, ${green || this.green}, ${
			blue || this.blue
		}, ${alpha ?? this.alpha})`;
	}

	animate() {
		this.currentDuration = Date.now() - this.startTime;
		if (this.currentDuration <= 200) {
			this.x += this.initialVelocityX * PARTICLE_INITIAL_SPEED;
			this.y += this.initialVelocityY * PARTICLE_INITIAL_SPEED;
			this.alpha += 0.01;
			this.colour = this.getColour(240, 240, 240, 0.9);
		} else {
			this.x += this.velocityX;
			this.y += this.velocityY;
			this.colour = this.getColour(
				this.red,
				this.green,
				this.blue,
				0.4 + Math.random() * 0.3,
			);
		}
		this.velocityY += GRAVITY / 1000;
		if (this.currentDuration >= this.duration) {
			this.velocityX -= this.velocityX / this.dampening;
			this.velocityY -= this.velocityY / this.dampening;
		}
		if (this.currentDuration >= this.duration + this.duration / 1.1) {
			this.alpha -= 0.02;
			this.colour = this.getColour();
		} else if (this.alpha < 1) {
			this.alpha += 0.03;
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.colour;
		ctx.shadowBlur = 4;
		ctx.shadowColor = this.getColour(
			this.red + 150,
			this.green + 150,
			this.blue + 150,
			1,
		);
		ctx.fill();
	}
}

type FireworksScope = "fullscreen" | "section";

const FireworksCanvas: React.FC<{ scope?: FireworksScope }> = ({
	scope = "fullscreen",
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const particlesRef = useRef<Particle[]>([]);
	const animationFrameIdRef = useRef<number | null>(null);
	const disableAutoFireworksRef = useRef<boolean>(false);
	const resetDisableRef = useRef<number | null>(null);
	const isVisibleRef = useRef<boolean>(true);

	const createFirework = useCallback((x?: number, y?: number) => {
		// Performance cap: skip firework creation if particle count exceeds limit
		if (particlesRef.current.length > 500) {
			return;
		}
		const width = canvasRef.current?.width || 0;
		const height = canvasRef.current?.height || 0;
		const fx = x ?? Math.random() * width;
		const fy = y ?? Math.random() * height;
		const speed = Math.random() * 2 + BASE_PARTICLE_SPEED;
		let maxSpeed = speed;
		let red = ~~(Math.random() * 255);
		let green = ~~(Math.random() * 255);
		let blue = ~~(Math.random() * 255);
		red = red < 150 ? red + 150 : red;
		green = green < 150 ? green + 150 : green;
		blue = blue < 150 ? blue + 150 : blue;
		for (let i = 0; i < PARTICLES_PER_FIREWORK; i++) {
			const p = new Particle(fx, fy, red, green, blue, speed);
			particlesRef.current.push(p);
			maxSpeed = speed > maxSpeed ? speed : maxSpeed;
		}
		for (let i = 0; i < 40; i++) {
			const p = new Particle(fx, fy, red, green, blue, maxSpeed, true);
			particlesRef.current.push(p);
		}
	}, []);

	const loop = useCallback(() => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		const particles = particlesRef.current;
		if (!ctx || !canvas) return;

		// Pause animation when canvas is not visible
		if (!isVisibleRef.current) {
			animationFrameIdRef.current = requestAnimationFrame(loop);
			return;
		}

		if (!disableAutoFireworksRef.current && Math.random() < FIREWORK_CHANCE) {
			createFirework();
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = particles.length - 1; i >= 0; i--) {
			const particle = particles[i];
			particle.animate();
			particle.render(ctx);
			if (
				particle.y > canvas.height ||
				particle.x < 0 ||
				particle.x > canvas.width ||
				particle.alpha <= 0
			) {
				particles.splice(i, 1);
			}
		}

		animationFrameIdRef.current = requestAnimationFrame(loop);
	}, [createFirework]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctxRef.current = ctx;

		const updateCanvasSize = () => {
			if (scope === "fullscreen") {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			} else {
				const parent = canvas.parentElement;
				const rect = parent?.getBoundingClientRect();
				canvas.width = rect
					? Math.max(1, Math.floor(rect.width))
					: window.innerWidth;
				canvas.height = rect
					? Math.max(1, Math.floor(rect.height))
					: Math.floor(window.innerHeight * 0.6);
			}
		};

		const handleClick = (e: MouseEvent) => {
			if (scope === "fullscreen") {
				createFirework(e.clientX, e.clientY);
				disableAutoFireworksRef.current = true;
				if (resetDisableRef.current)
					window.clearTimeout(resetDisableRef.current);
				resetDisableRef.current = window.setTimeout(() => {
					disableAutoFireworksRef.current = false;
				}, 3000);
			}
		};

		updateCanvasSize();
		animationFrameIdRef.current = requestAnimationFrame(loop);

		// Intersection observer to pause animation when off-screen
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisibleRef.current = entry.isIntersecting;
				});
			},
			{ threshold: 0 },
		);
		observer.observe(canvas);

		window.addEventListener("resize", updateCanvasSize);
		if (scope === "fullscreen") {
			window.addEventListener("click", handleClick);
		}

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateCanvasSize);
			if (scope === "fullscreen") {
				window.removeEventListener("click", handleClick);
			}
			if (animationFrameIdRef.current)
				cancelAnimationFrame(animationFrameIdRef.current);
			if (resetDisableRef.current) window.clearTimeout(resetDisableRef.current);
		};
	}, [loop, createFirework, scope]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: scope === "fullscreen" ? "fixed" : "absolute",
				inset: 0,
				zIndex: 0,
				pointerEvents: "none",
				width: scope === "fullscreen" ? "100vw" : "100%",
				height: scope === "fullscreen" ? "100vh" : "100%",
			}}
		/>
	);
};

export default FireworksCanvas;
