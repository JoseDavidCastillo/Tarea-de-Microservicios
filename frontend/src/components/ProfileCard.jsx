export default function ProfileCard({ profile, isAuthenticated, loading }) {
  return (
    <section className="card profile-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Current user</p>
          <h2>/api/me</h2>
        </div>
      </div>

      {!isAuthenticated ? (
        <p className="empty-state">Log in to load the protected profile endpoint.</p>
      ) : loading ? (
        <p className="status">Loading profile...</p>
      ) : profile ? (
        <div className="profile-panel">
          {profile.avatarUrl ? <img className="avatar large" src={profile.avatarUrl} alt={profile.displayName || 'User avatar'} /> : <div className="avatar large placeholder">{(profile.displayName || 'U').slice(0, 1)}</div>}
          <div>
            <h3>{profile.displayName}</h3>
            <p>{profile.email}</p>
            <p className="muted">Auth0 subject: {profile.auth0Id}</p>
          </div>
        </div>
      ) : (
        <p className="empty-state">No profile available yet.</p>
      )}
    </section>
  );
}