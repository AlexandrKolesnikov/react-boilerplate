interface SvgComponent extends React.FunctionComponent<React.SVGProps> {}

declare module '*.svg' {
  const value: SvgComponent;

  export default value;
}

declare module '*.png' {
  const value: string;

  export default value;
}

declare module '*.jpg' {
  const value: string;

  export default value;
}

declare module '*.jpeg' {
  const value: string;

  export default value;
}

declare module '*.gif' {
  const value: string;

  export default value;
}

declare module '*.bmp' {
  const value: string;

  export default value;
}

declare module '*.json' {
  const value: any;

  export default value;
}
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    API_HOST: string
  }
}
