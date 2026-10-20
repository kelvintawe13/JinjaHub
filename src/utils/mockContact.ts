import { normalizePhone } from './validation';

/** Simulated message send. 0700 000 000 triggers a network error for testing. */
export async function apiSendMessage(reply: string): Promise<void> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 900));
  if (normalizePhone(reply) === '+256700000000') {
    throw new Error("We couldn't send your message. Check your data or Wi-Fi and try again.");
  }
}