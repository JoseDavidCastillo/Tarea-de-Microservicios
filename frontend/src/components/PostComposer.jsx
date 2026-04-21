export default function PostComposer({
  isAuthenticated,
  value,
  remaining,
  busy,
  message,
  error,
  onChange,
  onSubmit,
  onLogin
}) {
  return (
    <section className="card composer-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Compose</p>
          <h2>Share a short post</h2>
        </div>
        <span className={`counter ${remaining < 20 ? 'warning' : ''}`}>{remaining} characters left</span>
      </div>

      <form onSubmit={onSubmit} className="composer-form">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={140}
          placeholder={isAuthenticated ? 'What is happening?' : 'Log in to write a post'}
          disabled={!isAuthenticated || busy}
          rows={4}
        />

        {error ? <p className="status error">{error}</p> : null}
        {message ? <p className="status success">{message}</p> : null}

        <div className="composer-actions">
          <p className="helper-text">
            {isAuthenticated ? 'Your token is attached automatically for write actions.' : 'Reading the stream is public. Writing requires Auth0 login.'}
          </p>
          <button className="button primary" type="submit" disabled={!isAuthenticated || busy || !value.trim()}>
            {busy ? 'Publishing...' : isAuthenticated ? 'Publish post' : 'Log in to publish'}
          </button>
        </div>

        {!isAuthenticated ? (
          <button className="button ghost full-width" type="button" onClick={onLogin}>
            Log in with Auth0
          </button>
        ) : null}
      </form>
    </section>
  );
}