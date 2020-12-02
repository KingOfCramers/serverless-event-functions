// Define types for our .env
declare namespace NodeJS {
  export interface ProcessEnv {
    TABLE: string;
    GQL_URL: string;
    SCRAPER_BASE_URL: string;
  }
}
