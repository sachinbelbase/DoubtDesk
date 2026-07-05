export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isRequired(value) {
  return typeof value === "string" ? value.trim().length > 0 : value != null;
}

export function minLength(value, length) {
  return typeof value === "string" && value.trim().length >= length;
}
