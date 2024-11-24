export const urlQueryBuilder = (obj: any, path?: string) => {
  const query = Object.entries(obj)
    .filter(([k, v]) => k && v)
    .map((f) => f.join("="))
    .join("&");
  return `${path ?? ""}?${query}`;
};
