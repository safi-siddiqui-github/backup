export const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
  percentage: number;
} => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  const percentage = (score / 6) * 100;
  
  if (score <= 2) return { score, label: 'Weak', color: 'hsl(0, 84%, 60%)', percentage };
  if (score <= 4) return { score, label: 'Medium', color: 'hsl(33, 95%, 44%)', percentage };
  return { score, label: 'Strong', color: 'hsl(142, 76%, 36%)', percentage };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
};
