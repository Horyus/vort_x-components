declare module "*.json" {
  const value: any;
  export default value;
}

declare namespace JSX {
    interface IntrinsicElements {
        VortexComponent: any
    }
}



