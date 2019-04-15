export const getParamValueByName = (name, match) => {
  const { params } = match || {};

  return params[name] || null;
};
