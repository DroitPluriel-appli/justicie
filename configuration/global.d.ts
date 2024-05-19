export { }

declare global {
  interface Window {
    dataLayer: Array<Record<string, ReadonlyArray<Critere> | number | string>>;
    tarteaucitron: {
      userInterface: {
        openPanel: () => void
      }
    }
  }
}
