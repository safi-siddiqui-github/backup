/**
 * Email validation utility
 */
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Password validation utility
 */
export function validatePassword(password: string): {
	valid: boolean;
	message?: string;
} {
	if (!password) {
		return { valid: false, message: "Password is required" };
	}

	if (password.length < 8) {
		return { valid: false, message: "Password must be at least 8 characters" };
	}

	if (!/[A-Z]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one uppercase letter",
		};
	}

	if (!/[a-z]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one lowercase letter",
		};
	}

	if (!/[0-9]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one number",
		};
	}

	if (!/[^A-Za-z0-9]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one special character",
		};
	}

	return { valid: true };
}

/**
 * Calculate password strength
 */
export function calculatePasswordStrength(password: string): {
	percentage: number;
	label: string;
	color: string;
} {
	if (!password) {
		return { percentage: 0, label: "", color: "" };
	}

	let score = 0;

	// Length check
	if (password.length >= 8) score += 20;
	if (password.length >= 12) score += 10;
	if (password.length >= 16) score += 10;

	// Complexity checks
	if (/[a-z]/.test(password)) score += 15;
	if (/[A-Z]/.test(password)) score += 15;
	if (/[0-9]/.test(password)) score += 15;
	if (/[^A-Za-z0-9]/.test(password)) score += 15;

	// Determine strength level
	if (score < 40) {
		return { percentage: score, label: "Weak", color: "#ef4444" }; // red
	} else if (score < 70) {
		return { percentage: score, label: "Medium", color: "#f59e0b" }; // yellow/amber
	} else {
		return {
			percentage: Math.min(score, 100),
			label: "Strong",
			color: "#10b981",
		}; // green
	}
}
