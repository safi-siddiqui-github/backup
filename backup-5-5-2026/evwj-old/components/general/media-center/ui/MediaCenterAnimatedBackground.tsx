"use client";

import { useEffect, useRef } from "react";

interface FloatingShape {
	id: number;
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	rotation: number;
	rotationSpeed: number;
	opacity: number;
	color: string;
	shape: "circle" | "triangle" | "square" | "hexagon";
}

export default function MediaCenterAnimatedBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | undefined>(undefined);
	const shapesRef = useRef<FloatingShape[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Initialize shapes
		const initShapes = () => {
			shapesRef.current = [];
			const shapeCount = Math.min(
				15,
				Math.floor((canvas.width * canvas.height) / 50000),
			);

			for (let i = 0; i < shapeCount; i++) {
				shapesRef.current.push({
					id: i,
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 60 + 20,
					speedX: (Math.random() - 0.5) * 0.5,
					speedY: (Math.random() - 0.5) * 0.5,
					rotation: Math.random() * Math.PI * 2,
					rotationSpeed: (Math.random() - 0.5) * 0.02,
					opacity: Math.random() * 0.1 + 0.05,
					color: ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"][
						Math.floor(Math.random() * 5)
					],
					shape: ["circle", "triangle", "square", "hexagon"][
						Math.floor(Math.random() * 4)
					] as "circle" | "triangle" | "square" | "hexagon",
				});
			}
		};

		initShapes();

		// Draw shapes
		const drawShape = (shape: FloatingShape) => {
			ctx.save();
			ctx.translate(shape.x, shape.y);
			ctx.rotate(shape.rotation);
			ctx.globalAlpha = shape.opacity;
			ctx.fillStyle = shape.color;
			ctx.strokeStyle = shape.color;
			ctx.lineWidth = 1;

			const size = shape.size;

			switch (shape.shape) {
				case "circle":
					ctx.beginPath();
					ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
					ctx.fill();
					break;

				case "triangle":
					ctx.beginPath();
					ctx.moveTo(0, -size / 2);
					ctx.lineTo(-size / 2, size / 2);
					ctx.lineTo(size / 2, size / 2);
					ctx.closePath();
					ctx.fill();
					break;

				case "square":
					ctx.fillRect(-size / 2, -size / 2, size, size);
					break;

				case "hexagon":
					ctx.beginPath();
					for (let i = 0; i < 6; i++) {
						const angle = (i * Math.PI) / 3;
						const x = (Math.cos(angle) * size) / 2;
						const y = (Math.sin(angle) * size) / 2;
						if (i === 0) ctx.moveTo(x, y);
						else ctx.lineTo(x, y);
					}
					ctx.closePath();
					ctx.fill();
					break;
			}

			ctx.restore();
		};

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			shapesRef.current.forEach((shape) => {
				// Update position
				shape.x += shape.speedX;
				shape.y += shape.speedY;
				shape.rotation += shape.rotationSpeed;

				// Wrap around edges
				if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
				if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
				if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
				if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

				drawShape(shape);
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/40" />

			{/* Animated Canvas */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full"
				style={{ background: "transparent" }}
			/>

			{/* Additional gradient overlays for depth */}
			<div className="absolute inset-0 bg-linear-to-tr from-transparent via-indigo-50/20 to-transparent" />
			<div className="absolute inset-0 bg-linear-to-bl from-transparent via-purple-50/10 to-transparent" />
		</div>
	);
}
