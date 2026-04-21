import { initializeDatabase } from "./app/lib/database/init";

export function register() {
    initializeDatabase().catch((error) => {
        console.error("Database initialization failed:", error);
    });
}