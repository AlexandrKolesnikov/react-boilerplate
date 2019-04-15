import _mapValues from 'lodash/mapValues';

export const bindFunctionsByArgument = (functions, data) => {
  const bindActionCreator = actionCreator => actionCreator.bind(null, data);

  return _mapValues(functions, bindActionCreator);
};
