export const PASSWORD_MIN = 8;
export const AGE_MIN = 14;
export const AGE_MAX = 21;
export const AGE_ERROR = 'This program is for ages 14 to 21. Enter an age in that range.';
export const PASSWORD_RULE = `At least ${PASSWORD_MIN} characters.`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function cleanPhone(value: string): string {
  return value.replace(/[\s\-()]/g, '');
}

/** Returns the number in +2567XXXXXXXX form, or null if it isn't a valid Ugandan mobile. */
export function normalizePhone(value: string): string | null {
  const c = cleanPhone(value);
  let rest: string | null = null;
  if (c.startsWith('+256')) rest = c.slice(4);else
  if (c.startsWith('256')) rest = c.slice(3);else
  if (c.startsWith('0')) rest = c.slice(1);
  if (rest !== null && /^7\d{8}$/.test(rest)) return `+256${rest}`;
  return null;
}

export function formatPhone(normalized: string): string {
  const n = normalizePhone(normalized);
  if (!n) return normalized;
  return `+256 ${n.slice(4, 7)} ${n.slice(7, 10)} ${n.slice(10)}`;
}

/** Live check: `final` is false while typing, true after blur or submit. */
export function validatePhone(value: string, final: boolean): string | null {
  const c = cleanPhone(value);
  if (!c) return final ? 'Enter your phone number.' : null;
  if (/[^\d+]/.test(c) || c.lastIndexOf('+') > 0) {
    return 'Use numbers only, like 0772 123 456.';
  }

  let rest: string;
  if (c.startsWith('+')) {
    if (c.length <= 4) return '+256'.startsWith(c) ? final ? 'Finish typing your number.' : null : 'Ugandan numbers start with +256 or 0.';
    if (!c.startsWith('+256')) return 'Ugandan numbers start with +256 or 0.';
    rest = c.slice(4);
  } else if (c.startsWith('256')) {
    rest = c.slice(3);
  } else if (c.startsWith('0')) {
    rest = c.slice(1);
  } else if ('256'.startsWith(c)) {
    return final ? 'Start with 0 or +256, like 0772 123 456.' : null;
  } else {
    return 'Start with 0 or +256, like 0772 123 456.';
  }

  if (rest.length > 0 && rest[0] !== '7') {
    return 'Ugandan mobile numbers start with 07 or +256 7.';
  }
  if (rest.length > 9) {
    return 'That has too many digits. A mobile number is 10 digits, like 0772 123 456.';
  }
  if (rest.length < 9) {
    return final ? 'That number is too short. It should be 10 digits, like 0772 123 456.' : null;
  }
  return null;
}

export function validateIdentifier(value: string, final: boolean): string | null {
  const v = value.trim();
  if (!v) return final ? 'Enter your phone number or email.' : null;
  if (v.includes('@') || /[a-zA-Z]/.test(v)) {
    if (!final) return null;
    return EMAIL_PATTERN.test(v) ? null : 'Enter a full email like name@example.com, or a phone number.';
  }
  return validatePhone(v, final);
}

export function validateName(value: string, final: boolean): string | null {
  const v = value.trim();
  if (!v) return final ? 'Enter your full name.' : null;
  if (/[^a-zA-Z\s'\-.]/.test(v)) return 'Use letters only in your name.';
  if (v.length > 60) return 'That name is too long. Use 60 characters or fewer.';
  if (final && v.split(/\s+/).filter((p) => p.length > 1).length < 2) {
    return 'Enter your first and last name.';
  }
  return null;
}

export function validateAge(value: string, final: boolean): string | null {
  const v = value.trim();
  if (!v) return final ? 'Enter your age.' : null;
  if (!/^\d+$/.test(v)) return 'Enter your age as a number, like 17.';
  if (!final && v.length < 2) return null;
  const n = Number(v);
  if (n < AGE_MIN || n > AGE_MAX) return AGE_ERROR;
  return null;
}

export function validatePassword(value: string, final: boolean): string | null {
  if (!value) return final ? `Create a password with at least ${PASSWORD_MIN} characters.` : null;
  if (value.length < PASSWORD_MIN && final) {
    return `Use at least ${PASSWORD_MIN} characters. You have ${value.length}.`;
  }
  return null;
}

export function validateConfirm(password: string, confirm: string, final: boolean): string | null {
  if (!confirm) return final ? 'Type the new password again.' : null;
  if (final && confirm !== password) return "The passwords don't match. Check both and try again.";
  return null;
}

export function validateEmailOrPhone(value: string, final: boolean): string | null {
  return validateIdentifier(value, final);
}