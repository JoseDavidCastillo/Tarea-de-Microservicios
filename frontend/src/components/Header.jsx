export default function Header({ user, isAuthenticated, onLogin, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Secure social feed</p>
        <h1>Post in public. Keep write access protected.</h1>
      </div>

      <div className="topbar-actions">
        {isAuthenticated && user ? (
          <div className="profile-pill">
            {user.picture ? <img src={user.picture} alt={user.name || 'User avatar'} /> : <span>{(user.name || 'U').slice(0, 1)}</span>}
            <span>{user.name || user.email || 'Authenticated user'}</span>
          </div>
        ) : null}

        {isAuthenticated ? (
          <button className="button secondary" type="button" onClick={onLogout}>Log out</button>
        ) : (
          <button className="button primary" type="button" onClick={onLogin}>Log in</button>
        )}
      </div>
    </header>
  );
}