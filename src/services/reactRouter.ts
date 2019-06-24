import { RouteComponentProps } from "react-router";

export const getParamValueByName = (name: string, history: RouteComponentProps<{ [key: string]: any }>): string => {
    const { params } = history.match;

    return params[name];
};
