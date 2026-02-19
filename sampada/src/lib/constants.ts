/**
 * Minimum time (ms) the bootstrap overlay is shown on app load
 * when a session hint is present.
 */
export const BOOTSTRAP_MIN_DELAY_MS = 700;

/**
 * Minimum time (ms) the bootstrap overlay is shown after the
 * profile setup POST completes (post-Continue transition).
 */
export const SETUP_COMPLETE_MIN_DELAY_MS = 700;


/** Axios request timeout in milliseconds. */
export const API_TIMEOUT_IN_MS = 120_000;

/**
 * Backend API base URL — driven by VITE_API_BASE_URL env var.
 * Set in .env (committed default) and override in .env.local (gitignored).
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
