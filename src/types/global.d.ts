
declare global {
  interface Window {
    gtag: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}

export {};
