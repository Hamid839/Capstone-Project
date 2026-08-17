function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <span>⚠️ {message}</span>
      {onDismiss && (
        <button className="dismiss-btn" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;
