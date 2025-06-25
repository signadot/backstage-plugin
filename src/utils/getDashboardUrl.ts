const BASE_URL = "https://app.signadot.com";

const getDashboardUrl = (page: string) => {
  const url = new URL(BASE_URL);
  url.pathname = page;
  return url.toString();
};

export { getDashboardUrl };
