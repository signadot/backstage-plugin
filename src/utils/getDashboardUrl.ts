const BASE_URL = "https://app.signadot.com";

const getDashboardUrl = (page: string, query?: string) => {
  const url = new URL(BASE_URL);
  url.pathname = page;
  if (query) {
    url.search = query;
  }
  return url.toString();
};

export { getDashboardUrl };
