import "server-only";

import { initializeDatabase } from "./init";

declare global {
  // Shared across hot reloads to avoid repeated startup writes.
  // eslint-disable-next-line no-var
  var __databaseInitializationPromise: Promise<void> | undefined;
}

export function ensureDatabaseInitialized(): Promise<void> {
  if (!globalThis.__databaseInitializationPromise) {
    globalThis.__databaseInitializationPromise = initializeDatabase().catch((error) => {
      console.error("Database initialization failed:", error);
      globalThis.__databaseInitializationPromise = undefined;
    });
  }

  return globalThis.__databaseInitializationPromise;
}
