export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="skip-link fixed top-2 left-2 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="skip-link fixed top-2 left-24 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to navigation
      </a>
    </div>
  );
}
