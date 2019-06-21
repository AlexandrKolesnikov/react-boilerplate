import _mapValues from 'lodash/mapValues';

export const bindFunctionsByArgument = (functions: any[], data: any) => {
  const bindActionCreator = (actionCreator: (args?: any[]) => any) => actionCreator.bind(null, data);

  return _mapValues(functions, bindActionCreator);
};
