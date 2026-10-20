export type AuthErrorCode =
'network' |
'not_found' |
'invalid_credentials' |
'exists' |
'wrong_code' |
'expired';

export interface Account {
  id: string;
  name: string;
  age: number;
  phone: string;
  email?: string;
  password: string;
  verified: boolean;
}

export interface NewAccountInput {
  name: string;
  age: number;
  phone: string;
  password: string;
}

export type Application = {
  name: string;
  age: string;
  phone: string;
  lastClass: string;
  course: string;
  guardianPhone: string;
  needsFeeHelp: boolean;
  submittedAt?: string;
};