function formatDate(value) {
  if (!value) {
    return 'Just now';
  }

  return new Date(value).toLocaleString();
}

export default function StreamList({ posts, loading, error, onReload }) {
  return (
    <section className="card stream-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Public stream</p>
          <h2>Latest posts</h2>
        </div>
        <button className="button secondary" type="button" onClick={onReload} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <p className="status error">{error}</p> : null}
      {loading ? <p className="status">Loading stream...</p> : null}

      <div className="post-list">
        {posts.length === 0 && !loading ? <p className="empty-state">No posts yet. Be the first one.</p> : null}

        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-meta">
              <strong>{post.authorDisplayName}</strong>
              <span>{post.authorEmail}</span>
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            </div>
            <p className="post-content">{post.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}