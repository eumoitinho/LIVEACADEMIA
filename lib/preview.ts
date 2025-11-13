import { draftMode } from 'next/headers';

/**
 * Check if preview mode is enabled (server-side)
 */
export async function isPreviewModeServer(): Promise<boolean> {
  const { isEnabled } = draftMode();
  return isEnabled;
}

