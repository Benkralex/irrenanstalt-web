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

  const url = rawDatabaseUrl
    ?.replace("${POSTGRES_USER}", user)
    .replace("${POSTGRES_PASSWORD}", password)
    .replace("${POSTGRES_HOST}", host)
    .replace("${POSTGRES_PORT}", port)
    .replace("${POSTGRES_DB}", database) ||
    `postgresql://${user}:${password}@${host}:${port}/${database}`;
  console.log("Database URL:", url);
  return url;
};

export function makeBaseUrl() {
  const rawBaseUrl = process.env.BASE_URL;

  if (rawBaseUrl && !hasUnresolvedPlaceholder(rawBaseUrl)) {
    return rawBaseUrl;
  }

  const protocol = process.env.BASE_URL_PROTOCOL ?? "http";
  const host = process.env.BASE_URL_HOST ?? "localhost";
  const port = process.env.BASE_URL_PORT ?? "3000";

  return rawBaseUrl
    ?.replace("${BASE_URL_PROTOCOL}", protocol)
    .replace("${BASE_URL_HOST}", host)
    .replace("${BASE_URL_PORT}", port) ||
    `${protocol}://${host}:${port}/`;
};

export function makeAuthUrl() {
  return `${makeBaseUrl()}api/auth`;
};