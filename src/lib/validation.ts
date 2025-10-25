import type { LoginFormData, SignupFormData } from '@/types';

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? undefined : 'Invalid email format';
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  return password.length >= 6 ? undefined : 'Password must be at least 6 characters';
};

export const validateName = (name: string): string | undefined => {
  if (!name) return 'Name is required';
  return name.length >= 2 ? undefined : 'Name must be at least 2 characters';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password';
  return password === confirmPassword ? undefined : 'Passwords do not match';
};

export const validateLoginForm = (values: LoginFormData): Partial<Record<keyof LoginFormData, string>> => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignupForm = (values: SignupFormData): Partial<Record<keyof SignupFormData, string>> => {
  const errors: Partial<Record<keyof SignupFormData, string>> = {};
  
  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
};
