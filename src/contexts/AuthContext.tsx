import React, { createContext, useEffect, useState } from 'react';
import type { Account, Application, NewAccountInput } from '../types/auth';
import {
  apiCheckCode,
  apiDiscardAccount,
  apiMarkVerified,
  apiRequestReset,
  apiResetPassword,
  apiSendCode,
  apiSignIn,
  apiSignUp,
  apiSubmitApplication,
  findAccountById } from
'../utils/mockAuth';
import { readStored, writeStored } from '../utils/storage';

export interface AuthContextValue {
  user: Account | null;
  pendingAccount: Account | null;
  application: Application | null;
  draft: Partial<Application> | null;
  resetIdentifier: string | null;
  signIn: (identifier: string, password: string) => Promise<Account>;
  signUp: (input: NewAccountInput) => Promise<void>;
  confirmCode: (code: string) => Promise<Account>;
  resendCode: () => Promise<void>;
  startReset: (identifier: string) => Promise<void>;
  resendResetCode: () => Promise<void>;
  completeReset: (code: string, password: string) => Promise<void>;
  saveDraft: (draft: Partial<Application>) => void;
  submitApplication: (application: Application) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function loadAccount(key: string): Account | null {
  const id = readStored<string>(key);
  return id ? findAccountById(id) ?? null : null;
}

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<Account | null>(() => loadAccount('jeh.session'));
  const [pendingAccount, setPendingAccount] = useState<Account | null>(() => loadAccount('jeh.pending'));
  const [draft, setDraft] = useState<Partial<Application> | null>(() => readStored('jeh.draft'));
  const [applications, setApplications] = useState<Record<string, Application>>(
    () => readStored('jeh.applications') ?? {}
  );
  const [resetIdentifier, setResetIdentifier] = useState<string | null>(() => readStored('jeh.reset'));

  useEffect(() => writeStored('jeh.session', user?.id ?? null), [user]);
  useEffect(() => writeStored('jeh.pending', pendingAccount?.id ?? null), [pendingAccount]);
  useEffect(() => writeStored('jeh.draft', draft), [draft]);
  useEffect(() => writeStored('jeh.applications', applications), [applications]);
  useEffect(() => writeStored('jeh.reset', resetIdentifier), [resetIdentifier]);

  async function signIn(identifier: string, password: string) {
    const account = await apiSignIn(identifier, password);
    if (!account.verified) {
      await apiSendCode(account.phone);
      setPendingAccount(account);
    } else {
      setUser(account);
    }
    return account;
  }

  async function signUp(input: NewAccountInput) {
    if (pendingAccount && !pendingAccount.verified) apiDiscardAccount(pendingAccount.id);
    const account = await apiSignUp(input);
    setPendingAccount(account);
  }

  async function confirmCode(code: string) {
    if (!pendingAccount) throw new Error('No number waiting for a code.');
    await apiCheckCode(code);
    const account = apiMarkVerified(pendingAccount.id);
    setPendingAccount(null);
    setUser(account);
    return account;
  }

  async function resendCode() {
    if (pendingAccount) await apiSendCode(pendingAccount.phone);
  }

  async function startReset(identifier: string) {
    await apiRequestReset(identifier);
    setResetIdentifier(identifier.trim());
  }

  async function resendResetCode() {
    if (resetIdentifier) await apiSendCode(resetIdentifier);
  }

  async function completeReset(code: string, password: string) {
    if (!resetIdentifier) throw new Error('No reset in progress.');
    await apiResetPassword(resetIdentifier, code, password);
    setResetIdentifier(null);
  }

  async function submitApplication(next: Application) {
    if (!user) throw new Error('Sign in to send your application.');
    await apiSubmitApplication(next);
    setApplications((prev) => ({ ...prev, [user.id]: { ...next, submittedAt: new Date().toISOString() } }));
    setDraft(null);
  }

  const value: AuthContextValue = {
    user,
    pendingAccount,
    application: user ? applications[user.id] ?? null : null,
    draft,
    resetIdentifier,
    signIn,
    signUp,
    confirmCode,
    resendCode,
    startReset,
    resendResetCode,
    completeReset,
    saveDraft: setDraft,
    submitApplication,
    signOut: () => setUser(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}