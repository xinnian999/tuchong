export const REPOSITORY_URL = "https://github.com/xinnian999/tuchong";

// Set NEXT_PUBLIC_SITE_URL to the public origin when deploying the documentation site.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || REPOSITORY_URL).replace(/\/$/, "");
