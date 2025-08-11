interface Window {
  redirectToOrderSuccess: () => void;
}

export {}; 

// JSX namespace for TS when using isolatedModules in some contexts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      script: any;
    }
  }
}