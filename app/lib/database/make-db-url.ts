const hasUnresolvedPlaceholder = (value: string | undefined) =>
  Boolean(value && value.includes("${"));

export function makeDatabaseUrl() {
  const rawDatabaseUrl = process.env.DATABASE_URL;

  if (rawDatabaseUrl && !hasUnresolvedPlaceholder(rawDatabaseUrl)) {
    return rawDatabaseUrl;
  }

  const user = encodeURIComponent(process.env.POSTGRES_USER ?? "postgres");
  const password = encodeURIComponent(process.env.POSTGRES_PASSWORD ?? "");
  const host = process.env.POSTGRES_HOST ?? "localhost";
  const port = process.env.POSTGRES_PORT ?? "5432";
  const database = process.env.POSTGRES_DB ?? "postgres";

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};