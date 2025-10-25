import type { LoginFormData, SignupFormData } from "@/types";

export const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? undefined : "Invalid email format";
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  return password.length >= 6
    ? undefined
    : "Password must be at least 6 characters";
};

export const validateName = (name: string): string | undefined => {
  if (!name) return "Name is required";
  return name.length >= 2 ? undefined : "Name must be at least 2 characters";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | undefined => {
  if (!confirmPassword) return "Please confirm your password";
  return password === confirmPassword ? undefined : "Passwords do not match";
};

export const validateLoginForm = (
  values: LoginFormData,
): Partial<Record<keyof LoginFormData, string>> => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateSignupForm = (
  values: SignupFormData,
): Partial<Record<keyof SignupFormData, string>> => {
  const errors: Partial<Record<keyof SignupFormData, string>> = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    values.password,
    values.confirmPassword,
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};

// Ticket validation functions
export const validateTicketTitle = (title: string): string | undefined => {
  if (!title.trim()) return "Title is required";
  if (title.length < 3) return "Title must be at least 3 characters";
  if (title.length > 100) return "Title must not exceed 100 characters";
  return undefined;
};

export const validateTicketDescription = (
  description: string,
): string | undefined => {
  if (description && description.length > 500) {
    return "Description must not exceed 500 characters";
  }
  return undefined;
};

export const validateTicketStatus = (status: string): string | undefined => {
  const validStatuses = ["open", "in_progress", "closed"];
  if (!status) return "Status is required";
  if (!validStatuses.includes(status)) return "Invalid status value";
  return undefined;
};

export const validateTicketPriority = (
  priority: string,
): string | undefined => {
  const validPriorities = ["low", "medium", "high"];
  if (!priority) return "Priority is required";
  if (!validPriorities.includes(priority)) return "Invalid priority value";
  return undefined;
};

export interface TicketFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
}

export const validateTicketForm = (
  values: TicketFormData,
): Partial<Record<keyof TicketFormData, string>> => {
  const errors: Partial<Record<keyof TicketFormData, string>> = {};

  const titleError = validateTicketTitle(values.title);
  if (titleError) errors.title = titleError;

  const descError = validateTicketDescription(values.description);
  if (descError) errors.description = descError;

  const statusError = validateTicketStatus(values.status);
  if (statusError) errors.status = statusError;

  const priorityError = validateTicketPriority(values.priority);
  if (priorityError) errors.priority = priorityError;

  return errors;
};
