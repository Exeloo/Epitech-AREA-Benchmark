export const copySameProperties = (o1: object, o2: any) => {
  const result = {};
  const keysToCompare = Object.keys(o2);
  for (const [key, value] of Object.entries(o1)) {
    if (key in keysToCompare) {
      result[key] = value;
    }
  }
  return result;
};
