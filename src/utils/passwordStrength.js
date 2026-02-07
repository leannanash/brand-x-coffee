export function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "danger", percent: 25 };
  if (score === 2) return { label: "Fair", color: "warning", percent: 50 };
  if (score === 3) return { label: "Good", color: "info", percent: 75 };
  return { label: "Strong", color: "success", percent: 100 };
}
