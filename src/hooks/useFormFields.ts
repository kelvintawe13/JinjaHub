import React, { useState } from 'react';

type FieldValue = string | boolean;

export type FieldValidators<T> = Partial<{ [K in
keyof T]: (values: T, final: boolean) => string | null }>;


/**
 * Small form helper: live validation while typing, full validation after blur or submit,
 * and server errors that clear as soon as the field is edited.
 * Field ids equal their keys so the first invalid field can receive focus.
 */
export function useFormFields<T extends Record<string, FieldValue>>(initial: T, validators: FieldValidators<T>) {
  const [values, setValues] = useState<T>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function errorFor(key: keyof T): string | null {
    const server = serverErrors[key];
    if (server) return server;
    const validate = validators[key];
    return validate ? validate(values, submitted || Boolean(touched[key])) : null;
  }

  function setValue(key: keyof T, value: T[keyof T]) {
    setValues((prev) => ({ ...prev, [key]: value }) as T);
    setServerErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function bind(key: keyof T) {
    return {
      id: String(key),
      name: String(key),
      value: String(values[key] ?? ''),
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValue(key, e.target.value as T[keyof T]),
      onBlur: () => setTouched((prev) => ({ ...prev, [key]: true })),
      error: errorFor(key)
    };
  }

  function validateAll(): boolean {
    setSubmitted(true);
    const keys = Object.keys(validators) as Array<keyof T>;
    const firstInvalid = keys.find((k) => validators[k]?.(values, true));
    if (firstInvalid !== undefined) {
      document.getElementById(String(firstInvalid))?.focus();
      return false;
    }
    return true;
  }

  function setServerError(key: keyof T, message: string) {
    setServerErrors((prev) => ({ ...prev, [key]: message }));
    document.getElementById(String(key))?.focus();
  }

  return { values, setValue, bind, errorFor, validateAll, setServerError };
}