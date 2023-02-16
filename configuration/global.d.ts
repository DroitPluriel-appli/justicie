export { }

declare global {
  interface Window {
    dataLayer: Record<string, string | Critere[] | number>[];
    tarteaucitron: {
      userInterface: {
        openPanel: () => void
      }
    }
  }
}
