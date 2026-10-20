import type { Account, Application, AuthErrorCode, NewAccountInput } from '../types/auth';
import { normalizePhone } from './validation';
import { readStored, writeStored } from './storage';

/**
 * Simulated backend for the prototype.
 * - Demo account: 0772 123 456 / learn2026
 * - Correct code: 123456 · Expired code: 000000
 * - Any request using 0700 000 000 fails with a network error.
 */
export const DEMO_CODE = '123456';
export const EXPIRED_CODE = '000000';
const NETWORK_FAIL_PHONE = '+256700000000';
const ACCOUNTS_KEY = 'jeh.accounts';

const seedAccounts: Account[] = [
{
  id: 'acc-demo',
  name: 'Amina Nakato',
  age: 19,
  phone: '+256772123456',
  email: 'amina@example.com',
  password: 'learn2026',
  verified: true
}];


export class AuthError extends Error {
  code: AuthErrorCode;
  field?: string;

  constructor(code: AuthErrorCode, message: string, field?: string) {
    super(message);
    this.code = code;
    this.field = field;
  }
}

const wait = (ms = 900) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function readAccounts(): Account[] {
  return readStored<Account[]>(ACCOUNTS_KEY) ?? seedAccounts;
}

function writeAccounts(accounts: Account[]): void {
  writeStored(ACCOUNTS_KEY, accounts);
}

function findByIdentifier(identifier: string): Account | undefined {
  const phone = normalizePhone(identifier);
  const email = identifier.trim().toLowerCase();
  return readAccounts().find(
    (a) => phone !== null && a.phone === phone || a.email !== undefined && a.email.toLowerCase() === email
  );
}

function failIfOffline(identifier: string): void {
  if (normalizePhone(identifier) === NETWORK_FAIL_PHONE) {
    throw new AuthError('network', "We couldn't reach Edu-Hub. Check your data or Wi-Fi and try again.");
  }
}

export function findAccountById(id: string): Account | undefined {
  return readAccounts().find((a) => a.id === id);
}

export async function apiSignIn(identifier: string, password: string): Promise<Account> {
  await wait();
  failIfOffline(identifier);
  const account = findByIdentifier(identifier);
  if (!account) {
    throw new AuthError('not_found', "We can't find an account with that phone or email.", 'identifier');
  }
  if (account.password !== password) {
    throw new AuthError('invalid_credentials', "That password isn't right. Try again, or reset it below.", 'password');
  }
  return account;
}

export async function apiSignUp(input: NewAccountInput): Promise<Account> {
  await wait();
  failIfOffline(input.phone);
  if (findByIdentifier(input.phone)) {
    throw new AuthError('exists', 'An account with this number already exists.', 'phone');
  }
  const account: Account = { ...input, id: `acc-${Date.now()}`, verified: false };
  writeAccounts([...readAccounts(), account]);
  return account;
}

export function apiDiscardAccount(id: string): void {
  writeAccounts(readAccounts().filter((a) => a.id !== id || a.verified));
}

export async function apiSendCode(identifier: string): Promise<void> {
  await wait(700);
  failIfOffline(identifier);
}

export async function apiCheckCode(code: string): Promise<void> {
  await wait(700);
  if (code === EXPIRED_CODE) {
    throw new AuthError('expired', 'This code has expired. Send a new one below.', 'code');
  }
  if (code !== DEMO_CODE) {
    throw new AuthError('wrong_code', "That code isn't right. Check the SMS and try again.", 'code');
  }
}

export function apiMarkVerified(id: string): Account {
  const accounts = readAccounts().map((a) => a.id === id ? { ...a, verified: true } : a);
  writeAccounts(accounts);
  const account = accounts.find((a) => a.id === id);
  if (!account) throw new AuthError('not_found', "We couldn't find that account. Please sign up again.");
  return account;
}

export async function apiRequestReset(identifier: string): Promise<void> {
  await wait();
  failIfOffline(identifier);
  if (!findByIdentifier(identifier)) {
    throw new AuthError(
      'not_found',
      "We can't find an account with that phone or email. Check it, or create a new account.",
      'identifier'
    );
  }
}

export async function apiResetPassword(identifier: string, code: string, password: string): Promise<void> {
  failIfOffline(identifier);
  await apiCheckCode(code);
  const target = findByIdentifier(identifier);
  writeAccounts(readAccounts().map((a) => target && a.id === target.id ? { ...a, password } : a));
}

export async function apiSubmitApplication(application: Application): Promise<void> {
  await wait(1100);
  failIfOffline(application.phone);
}